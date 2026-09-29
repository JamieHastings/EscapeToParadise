import { useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Calendar, Users, DollarSign, Mail, Phone, User, MessageSquare, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function PlanTrip() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelStartDate: '',
    travelEndDate: '',
    numberOfTravelers: '1',
    budget: '',
    tripType: 'Vacation',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const tripTypes = ['Honeymoon', 'Cruise', 'Family', 'Business', 'Vacation'];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('trip_requests').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          destination: formData.destination,
          travel_start_date: formData.travelStartDate || null,
          travel_end_date: formData.travelEndDate || null,
          number_of_travelers: parseInt(formData.numberOfTravelers),
          budget: formData.budget,
          trip_type: formData.tripType,
          additional_notes: formData.additionalNotes,
          status: 'new',
        },
      ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: '',
        travelStartDate: '',
        travelEndDate: '',
        numberOfTravelers: '1',
        budget: '',
        tripType: 'Vacation',
        additionalNotes: '',
      });
    } catch (error) {
      console.error('Error submitting trip request:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Plan Your Trip | Escape to Paradise Travel</title>
        <meta name="description" content="Tell us about your dream trip and let Audrey Hastings create the perfect vacation plan tailored to your budget and preferences." />
      </Helmet>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MapPin className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan Your Trip</h1>
            <p className="text-xl text-orange-100">
              Tell us about your dream vacation and we'll make it happen
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitStatus === 'success' ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for choosing TravelPro. One of our travel experts will review your
                request and contact you within 24 hours to discuss your dream vacation.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  <strong>What's next?</strong>
                </p>
                <ul className="text-left max-w-md mx-auto space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>We'll review your travel preferences and budget</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Our agent will contact you to discuss options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>We'll create a personalized itinerary just for you</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="mt-8 bg-gradient-to-r from-orange-500 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
              >
                Plan Another Trip
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tripType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Trip Type *
                      </label>
                      <select
                        id="tripType"
                        required
                        value={formData.tripType}
                        onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      >
                        {tripTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Trip Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
                        Destination *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="destination"
                          required
                          value={formData.destination}
                          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                          placeholder="Where would you like to go?"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="travelStartDate" className="block text-sm font-semibold text-gray-700 mb-2">
                        Travel Start Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          id="travelStartDate"
                          value={formData.travelStartDate}
                          onChange={(e) => setFormData({ ...formData, travelStartDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="travelEndDate" className="block text-sm font-semibold text-gray-700 mb-2">
                        Travel End Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          id="travelEndDate"
                          value={formData.travelEndDate}
                          onChange={(e) => setFormData({ ...formData, travelEndDate: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="numberOfTravelers" className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Travelers *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          id="numberOfTravelers"
                          required
                          min="1"
                          value={formData.numberOfTravelers}
                          onChange={(e) => setFormData({ ...formData, numberOfTravelers: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          placeholder="e.g., $2000 - $3000"
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="additionalNotes" className="block text-sm font-semibold text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                        <textarea
                          id="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                          rows={4}
                          placeholder="Tell us more about your ideal vacation..."
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-teal-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Trip Request'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-xl mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Share Your Vision</h3>
              <p className="text-gray-600">Tell us about your dream destination and travel preferences</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-xl mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Get Expert Advice</h3>
              <p className="text-gray-600">Our travel agent will create a personalized itinerary for you</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-xl mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Book & Travel</h3>
              <p className="text-gray-600">We'll handle all bookings and you just enjoy your vacation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
