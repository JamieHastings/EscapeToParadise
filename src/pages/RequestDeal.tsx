import { useState, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tag, User, Mail, Phone, Users, FileText, Plane } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendNotificationEmail } from '../lib/email';

export default function RequestDeal() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state ?? {}) as {
    dealName?: string;
    dealRoute?: string;
    dealPrice?: string;
    dealDates?: string;
  };

  const dealName = state.dealName ?? '';
  const dealRoute = state.dealRoute ?? '';
  const dealPrice = state.dealPrice ?? '';
  const dealDates = state.dealDates ?? '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '1',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('deal_requests').insert([
        {
          deal_name: dealName,
          deal_route: dealRoute,
          deal_price: dealPrice,
          deal_dates: dealDates,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelers: parseInt(formData.travelers),
          notes: formData.notes || null,
          status: 'pending',
        },
      ]);

      if (error) throw error;

      await sendNotificationEmail({
        subject: `New Deal Request: ${dealName}`,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        details: [
          `Deal Requested: ${dealName}`,
          dealRoute ? `Route: ${dealRoute}` : '',
          dealPrice ? `Price: $${dealPrice} per person` : '',
          dealDates ? `Travel Dates: ${dealDates}` : '',
          `Number of Travelers: ${formData.travelers}`,
          formData.notes ? `Additional Notes: ${formData.notes}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      });

      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting deal request:', err);
      alert('Failed to submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-orange-500 to-teal-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Tag className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Deal Request Sent!</h1>
            <p className="text-xl text-orange-100">
              Your interest in this deal has been received
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
              {dealName && (
                <p className="text-orange-600 font-semibold text-lg mb-4">{dealName}</p>
              )}
              <p className="text-lg text-gray-700 mb-6">
                Your deal request has been sent to Audrey. She will review the details and reach out to you shortly to finalize your booking.
              </p>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">1.</span>
                    <span>Audrey will review your deal request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">2.</span>
                    <span>She will confirm availability and pricing through the InteleTravel portal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">3.</span>
                    <span>You'll be contacted via email or phone to finalize the booking</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => navigate('/deals')}
                  className="bg-gradient-to-r from-orange-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg"
                >
                  Browse More Deals
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-500 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Tag className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request This Deal</h1>
          <p className="text-xl text-orange-100">
            Fill in your details and Audrey will be in touch to confirm your booking
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Deal Summary Banner */}
          {dealName && (
            <div className="bg-white rounded-2xl shadow-md border-l-4 border-orange-500 p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-1">Selected Deal</p>
                <h2 className="text-xl font-bold text-gray-900">{dealName}</h2>
                {dealRoute && <p className="text-gray-500 text-sm mt-0.5">{dealRoute}</p>}
              </div>
              <div className="text-right flex-shrink-0">
                {dealPrice && (
                  <>
                    <p className="text-2xl font-bold text-orange-600">${dealPrice}</p>
                    <p className="text-xs text-gray-500">per person</p>
                  </>
                )}
                {dealDates && (
                  <p className="text-xs text-gray-500 mt-1">{dealDates}</p>
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
              Your Personal Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                {/* Number of Travelers */}
                <div>
                  <label htmlFor="travelers" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Travelers *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      id="travelers"
                      required
                      min="1"
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    placeholder="Any questions or special requests..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-teal-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span>Sending Request...</span>
                ) : (
                  <>
                    <Plane className="h-5 w-5 mr-2" />
                    Send Deal Request
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
