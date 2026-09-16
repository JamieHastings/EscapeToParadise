import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Filter, X, Check, Calendar, Users, MapPin, Utensils, Bed, Plane } from 'lucide-react';
import DealCard from '../components/DealCard';
import { supabase } from '../lib/supabase';

interface Deal {
  id: string;
  category: string;
  destination: string;
  route: string;
  price: string;
  travelDates: string;
  imageUrl: string;
  details?: {
    description: string;
    includes: string[];
    duration: string;
    groupSize: string;
    accommodation: string;
    meals: string;
    highlights: string[];
  };
}

export default function Deals() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'Flights', 'Packages', 'Cruises', 'Hotels'];

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedDeals: Deal[] = (data || []).map((deal) => ({
        id: deal.id,
        category: deal.type,
        destination: deal.name,
        route: deal.route,
        price: deal.price_per_person.toString(),
        travelDates: formatDateRange(deal.travel_start_date, deal.travel_end_date),
        imageUrl: deal.image_url,
        details:
          deal.type === 'Packages' && deal.description
            ? {
                description: deal.description,
                includes: deal.includes || [],
                duration: deal.duration || '',
                groupSize: deal.group_size || '',
                accommodation: deal.accommodation || '',
                meals: deal.meals || '',
                highlights: deal.highlights || [],
              }
            : undefined,
      }));

      setDeals(formattedDeals);
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startFormatted = start.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const endFormatted = end.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return `${startFormatted} - ${endFormatted}`;
  };

  const filteredDeals = selectedFilter === 'All'
    ? deals
    : deals.filter(deal => deal.category === selectedFilter);

  const handleBookNow = () => {
    navigate('/plan-trip');
  };

  const handleMoreInfo = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  const closeModal = () => {
    setSelectedDeal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Tag className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Travel Deals</h1>
            <p className="text-xl text-orange-100">
              Discover amazing offers on flights, hotels, cruises, and vacation packages
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filter by:</span>
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
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-600">Loading deals...</p>
            </div>
          ) : filteredDeals.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No deals available at the moment.</p>
              <p className="text-gray-500 mt-2">Check back soon for amazing travel offers!</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredDeals.length}</span>{' '}
                  {selectedFilter === 'All' ? '' : selectedFilter} deal
                  {filteredDeals.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDeals.map((deal) => (
                  <DealCard
                    key={deal.id}
                    destination={deal.destination}
                    route={deal.route}
                    price={deal.price}
                    travelDates={deal.travelDates}
                    imageUrl={deal.imageUrl}
                    category={deal.category}
                    onBookNow={handleBookNow}
                    onMoreInfo={
                      deal.category === 'Packages' && deal.details
                        ? () => handleMoreInfo(deal)
                        : undefined
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Our travel experts can find the perfect deal for your specific needs
          </p>
          <a
            href="/plan-trip"
            className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Request Custom Quote
          </a>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border-2 border-blue-200 rounded-xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Why Book Through a Travel Agent?
              </h3>
              <p className="text-gray-600 mb-6">
                Access to exclusive deals, personalized service, and expert guidance at no extra cost
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="font-semibold text-orange-600 mb-2">Price Match Guarantee</div>
                  <p className="text-sm text-gray-600">
                    We'll match or beat any legitimate online price
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-orange-600 mb-2">24/7 Support</div>
                  <p className="text-sm text-gray-600">
                    Travel with confidence knowing we're here to help
                  </p>
                </div>
                <div>
                  <div className="font-semibold text-orange-600 mb-2">Exclusive Perks</div>
                  <p className="text-sm text-gray-600">
                    Access upgrades and amenities not available online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Details Modal */}
      {selectedDeal && selectedDeal.details && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedDeal.imageUrl}
                alt={selectedDeal.destination}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedDeal.destination}</h2>
                <p className="text-white text-lg">{selectedDeal.route}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Price and Dates */}
              <div className="flex flex-wrap items-center justify-between mb-6 pb-6 border-b">
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-5 w-5 mr-2 text-teal-500" />
                    <span>{selectedDeal.travelDates}</span>
                  </div>
                  <div className="text-sm text-gray-500">{selectedDeal.details.duration}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Starting from</div>
                  <div className="text-4xl font-bold text-orange-600">${selectedDeal.price}</div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About This Package</h3>
                <p className="text-gray-600 leading-relaxed">{selectedDeal.details.description}</p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="font-semibold text-gray-900">Duration</span>
                  </div>
                  <p className="text-gray-600 text-sm">{selectedDeal.details.duration}</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-teal-600 mr-2" />
                    <span className="font-semibold text-gray-900">Group Size</span>
                  </div>
                  <p className="text-gray-600 text-sm">{selectedDeal.details.groupSize}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Bed className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-gray-900">Accommodation</span>
                  </div>
                  <p className="text-gray-600 text-sm">{selectedDeal.details.accommodation}</p>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Check className="h-6 w-6 text-green-600 mr-2" />
                  What's Included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedDeal.details.includes.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meals */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Utensils className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="font-semibold text-gray-900">Meals Included</span>
                </div>
                <p className="text-gray-600">{selectedDeal.details.meals}</p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <MapPin className="h-6 w-6 text-orange-600 mr-2" />
                  Package Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedDeal.details.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-orange-500 to-teal-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <Plane className="h-5 w-5 mr-2" />
                Request This Deal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
