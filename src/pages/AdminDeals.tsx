import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { authService } from '../lib/auth';
import AdminDealsTable, { Deal } from '../components/AdminDealsTable';
import DealFormModal from '../components/DealFormModal';

export default function AdminDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const navigate = useNavigate();

  const filters = ['All', 'Flights', 'Packages', 'Cruises', 'Hotels'];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = await authService.getCurrentUser();
    if (!user) {
      navigate('/admin/login');
    } else {
      fetchDeals();
    }
  };

  useEffect(() => {
    filterDeals();
  }, [deals, selectedFilter, searchQuery]);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error) {
      console.error('Error fetching deals:', error);
      alert('Failed to load deals. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const filterDeals = () => {
    let filtered = deals;

    if (selectedFilter !== 'All') {
      filtered = filtered.filter((deal) => deal.type === selectedFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (deal) =>
          deal.name.toLowerCase().includes(query) ||
          deal.destination.toLowerCase().includes(query) ||
          deal.route.toLowerCase().includes(query)
      );
    }

    setFilteredDeals(filtered);
  };

  const handleAddDeal = () => {
    setEditingDeal(null);
    setShowModal(true);
  };

  const handleEditDeal = (deal: Deal) => {
    setEditingDeal(deal);
    setShowModal(true);
  };

  const handleSaveDeal = async (dealData: Partial<Deal>) => {
    try {
      if (editingDeal) {
        const { error } = await supabase
          .from('deals')
          .update(dealData)
          .eq('id', editingDeal.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('deals').insert([dealData]);

        if (error) throw error;
      }

      await fetchDeals();
      setShowModal(false);
      setEditingDeal(null);
    } catch (error) {
      console.error('Error saving deal:', error);
      throw error;
    }
  };

  const handleDeleteDeal = async (id: string) => {
    try {
      const { error } = await supabase.from('deals').delete().eq('id', id);

      if (error) throw error;
      await fetchDeals();
    } catch (error) {
      console.error('Error deleting deal:', error);
      alert('Failed to delete deal. Please try again.');
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('deals')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      await fetchDeals();
    } catch (error) {
      console.error('Error toggling deal status:', error);
      alert('Failed to update deal status. Please try again.');
    }
  };

  const handleDuplicateDeal = async (deal: Deal) => {
    try {
      const { id, created_at, updated_at, ...dealData } = deal;
      const duplicatedDeal = {
        ...dealData,
        name: `${deal.name} (Copy)`,
        is_active: false,
      };

      const { error } = await supabase.from('deals').insert([duplicatedDeal]);

      if (error) throw error;
      await fetchDeals();
    } catch (error) {
      console.error('Error duplicating deal:', error);
      alert('Failed to duplicate deal. Please try again.');
    }
  };

  const stats = {
    total: deals.length,
    active: deals.filter((d) => d.is_active).length,
    inactive: deals.filter((d) => !d.is_active).length,
    flights: deals.filter((d) => d.type === 'Flights').length,
    packages: deals.filter((d) => d.type === 'Packages').length,
    cruises: deals.filter((d) => d.type === 'Cruises').length,
    hotels: deals.filter((d) => d.type === 'Hotels').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Deals</h1>
          <p className="text-gray-600">Create and manage travel deals for the Deals page</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">Total Deals</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">Active</div>
            <div className="text-3xl font-bold text-green-600">{stats.active}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">Inactive</div>
            <div className="text-3xl font-bold text-gray-500">{stats.inactive}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">By Type</div>
            <div className="text-sm space-y-1 mt-2">
              <div className="flex justify-between">
                <span>Flights:</span>
                <span className="font-semibold">{stats.flights}</span>
              </div>
              <div className="flex justify-between">
                <span>Packages:</span>
                <span className="font-semibold">{stats.packages}</span>
              </div>
              <div className="flex justify-between">
                <span>Cruises:</span>
                <span className="font-semibold">{stats.cruises}</span>
              </div>
              <div className="flex justify-between">
                <span>Hotels:</span>
                <span className="font-semibold">{stats.hotels}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedFilter === filter
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddDeal}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-lg hover:from-orange-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg font-medium"
            >
              <Plus className="h-5 w-5" />
              Add New Deal
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search deals by name, destination, or route..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4 text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredDeals.length}</span> of{' '}
            <span className="font-semibold">{deals.length}</span> deal
            {filteredDeals.length !== 1 ? 's' : ''}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600">Loading deals...</p>
            </div>
          ) : (
            <AdminDealsTable
              deals={filteredDeals}
              onEdit={handleEditDeal}
              onDelete={handleDeleteDeal}
              onToggleActive={handleToggleActive}
              onDuplicate={handleDuplicateDeal}
            />
          )}
        </div>
      </div>

      {showModal && (
        <DealFormModal
          deal={editingDeal}
          onClose={() => {
            setShowModal(false);
            setEditingDeal(null);
          }}
          onSave={handleSaveDeal}
        />
      )}
    </div>
  );
}
