import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { authService } from '../lib/auth';
import AdminRequestTable, { FlightRequest } from '../components/AdminRequestTable';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<FlightRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadRequests();
  }, []);

  const checkAuth = async () => {
    const user = await authService.getCurrentUser();
    if (!user) {
      navigate('/admin/login');
    }
  };

  const loadRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('flight_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('flight_requests').delete().eq('id', id);

      if (error) throw error;

      setRequests(requests.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('Failed to delete request. Please try again.');
    }
  };

  const handleSignOut = async () => {
    await authService.signOut();
    navigate('/admin/login');
  };

  const filteredRequests =
    statusFilter === 'all'
      ? requests
      : requests.filter((r) => r.status === statusFilter);

  const statusCounts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    contacted: requests.filter((r) => r.status === 'contacted').length,
    completed: requests.filter((r) => r.status === 'completed').length,
    cancelled: requests.filter((r) => r.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-teal-500 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="mt-1 text-orange-100">Manage flight requests</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadRequests}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <button
            onClick={() => setStatusFilter('all')}
            className={`p-4 rounded-lg shadow transition-all ${
              statusFilter === 'all'
                ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white'
                : 'bg-white hover:shadow-md'
            }`}
          >
            <p className={`text-2xl font-bold ${statusFilter === 'all' ? 'text-white' : 'text-gray-900'}`}>
              {statusCounts.all}
            </p>
            <p className={`text-sm ${statusFilter === 'all' ? 'text-orange-100' : 'text-gray-600'}`}>
              All Requests
            </p>
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            className={`p-4 rounded-lg shadow transition-all ${
              statusFilter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-white hover:shadow-md'
            }`}
          >
            <p className={`text-2xl font-bold ${statusFilter === 'pending' ? 'text-white' : 'text-gray-900'}`}>
              {statusCounts.pending}
            </p>
            <p className={`text-sm ${statusFilter === 'pending' ? 'text-yellow-100' : 'text-gray-600'}`}>
              Pending
            </p>
          </button>

          <button
            onClick={() => setStatusFilter('contacted')}
            className={`p-4 rounded-lg shadow transition-all ${
              statusFilter === 'contacted'
                ? 'bg-blue-500 text-white'
                : 'bg-white hover:shadow-md'
            }`}
          >
            <p className={`text-2xl font-bold ${statusFilter === 'contacted' ? 'text-white' : 'text-gray-900'}`}>
              {statusCounts.contacted}
            </p>
            <p className={`text-sm ${statusFilter === 'contacted' ? 'text-blue-100' : 'text-gray-600'}`}>
              Contacted
            </p>
          </button>

          <button
            onClick={() => setStatusFilter('completed')}
            className={`p-4 rounded-lg shadow transition-all ${
              statusFilter === 'completed'
                ? 'bg-green-500 text-white'
                : 'bg-white hover:shadow-md'
            }`}
          >
            <p className={`text-2xl font-bold ${statusFilter === 'completed' ? 'text-white' : 'text-gray-900'}`}>
              {statusCounts.completed}
            </p>
            <p className={`text-sm ${statusFilter === 'completed' ? 'text-green-100' : 'text-gray-600'}`}>
              Completed
            </p>
          </button>

          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`p-4 rounded-lg shadow transition-all ${
              statusFilter === 'cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-white hover:shadow-md'
            }`}
          >
            <p className={`text-2xl font-bold ${statusFilter === 'cancelled' ? 'text-white' : 'text-gray-900'}`}>
              {statusCounts.cancelled}
            </p>
            <p className={`text-sm ${statusFilter === 'cancelled' ? 'text-red-100' : 'text-gray-600'}`}>
              Cancelled
            </p>
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading requests...</p>
          </div>
        ) : (
          <AdminRequestTable requests={filteredRequests} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
