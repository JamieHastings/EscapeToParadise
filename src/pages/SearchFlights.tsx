import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, DollarSign, Search } from 'lucide-react';

export default function SearchFlights() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    budget: '',
  });

  const [isSearching, setIsSearching] = useState(false);

  const popularRoutes = [
    { from: 'Kingston, Jamaica', to: 'Miami, USA', code: 'KIN-MIA' },
    { from: 'Kingston, Jamaica', to: 'New York, USA', code: 'KIN-NYC' },
    { from: 'Kingston, Jamaica', to: 'Toronto, Canada', code: 'KIN-YYZ' },
    { from: 'Montego Bay, Jamaica', to: 'Miami, USA', code: 'MBJ-MIA' },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      navigate('/request-flight');
    }, 400);
  };

  const handleQuickRoute = (route: typeof popularRoutes[0]) => {
    setFormData({
      ...formData,
      from: route.from,
      to: route.to,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Plane className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Search Flights</h1>
            <p className="text-xl text-orange-100">
              Find the best flight deals to your dream destination
            </p>
          </div>
        </div>
      </section>

      {/* Search Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From Field */}
                <div>
                  <label htmlFor="from" className="block text-sm font-semibold text-gray-700 mb-2">
                    From
                  </label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="from"
                      required
                      value={formData.from}
                      onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                      placeholder="Airport or City"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* To Field */}
                <div>
                  <label htmlFor="to" className="block text-sm font-semibold text-gray-700 mb-2">
                    To
                  </label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90" />
                    <input
                      type="text"
                      id="to"
                      required
                      value={formData.to}
                      onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                      placeholder="Airport or City"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div>
                  <label htmlFor="departDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      id="departDate"
                      required
                      value={formData.departDate}
                      onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Return Date */}
                <div>
                  <label htmlFor="returnDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    Return Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      id="returnDate"
                      required
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Budget (Optional) */}
              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget (Optional)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g., $500 - $1000"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="w-full bg-gradient-to-r from-orange-500 to-teal-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSearching ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Search Flights
                  </>
                )}
              </button>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Note:</strong> You will be taken to the flight request form where Audrey will
                find the best options for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() => handleQuickRoute(route)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-left group"
              >
                <div className="flex items-center mb-2">
                  <Plane className="h-5 w-5 text-orange-500 mr-2 group-hover:translate-x-1 transition-transform" />
                  <span className="font-semibold text-gray-900">{route.code}</span>
                </div>
                <p className="text-sm text-gray-600">{route.from}</p>
                <p className="text-sm text-gray-600">→ {route.to}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Need Help Finding the Perfect Flight?
          </h2>
          <p className="text-gray-600 mb-6">
            Our travel experts are here to assist you with personalized recommendations
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-orange-500 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
