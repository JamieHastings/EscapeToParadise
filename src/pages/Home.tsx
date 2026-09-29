import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Ship, Package, Shield, DollarSign, Clock, Heart, Users, Star, MessageSquare, Award, ChevronDown, X, Calendar, Check, Bed, Utensils, MapPin } from 'lucide-react';
import DealCard from '../components/DealCard';
import DestinationCard from '../components/DestinationCard';
import IconFeature from '../components/IconFeature';
import { supabase } from '../lib/supabase';

interface Deal {
  id: string;
  category: string;
  destination: string;
  route: string;
  price: string;
  travelDates: string;
  imageUrl: string;
  imageAlt?: string;
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

export default function Home() {
  const navigate = useNavigate();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [dealsLoading, setDealsLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('is_active', true)
        .or(`expires_at.is.null,expires_at.gte.${today}`)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      const formatted: Deal[] = (data || []).map((deal) => ({
        id: deal.id,
        category: deal.type,
        destination: deal.name,
        route: deal.route,
        price: deal.price_per_person.toString(),
        travelDates: formatDateRange(deal.travel_start_date, deal.travel_end_date),
        imageUrl: deal.image_url,
        imageAlt: deal.image_alt || undefined,
        details: deal.description
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

      setDeals(formatted);
    } catch {
      // silent — deals section will just be empty
    } finally {
      setDealsLoading(false);
    }
  };

  const formatDateRange = (start: string, end: string) => {
    const s = new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const e = new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${s} - ${e}`;
  };

  const destinations = [
    { name: 'Miami', imageUrl: 'https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Beautiful beaches, vibrant nightlife, and Art Deco architecture' },
    { name: 'New York', imageUrl: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'The city that never sleeps with iconic landmarks and culture' },
    { name: 'Punta Cana', imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Paradise beaches, crystal-clear waters, and all-inclusive resorts' },
    { name: 'Toronto', imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Multicultural metropolis with world-class dining and entertainment' },
    { name: 'Bahamas', imageUrl: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Tropical paradise with pristine beaches and turquoise waters' },
    { name: 'London', imageUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Historic landmarks, royal palaces, and world-class museums' },
  ];

  const services = [
    { icon: Plane, title: 'Flight Bookings', description: 'Competitive flight prices and flexible booking options' },
    { icon: Hotel, title: 'Hotel Reservations', description: 'Handpicked accommodations from budget to luxury worldwide' },
    { icon: Ship, title: 'Cruise Packages', description: 'Exclusive cruise deals with top cruise lines and destinations' },
    { icon: Package, title: 'Vacation Packages', description: 'All-inclusive packages combining flights, hotels, and activities' },
  ];

  const benefits = [
    { icon: Shield, title: 'Expert Guidance', description: 'Professional travel advice from a certified InteleTravel agent' },
    { icon: DollarSign, title: 'Best Prices', description: 'Access to exclusive deals and rates you won\'t find online' },
    { icon: Clock, title: 'Save Time', description: 'We handle all the research and booking details for you' },
    { icon: Heart, title: 'Personalized Service', description: 'Tailored travel planning based on your preferences and budget' },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Escape to Paradise Travel Agency | Jamaica Travel Agent</title>
        <meta name="description" content="Plan your dream vacation with Audrey Hastings, a certified InteleTravel agent with 40+ years of experience. Flights, packages, cruises and more, personalised just for you." />
      </Helmet>

      {/* ═══════════════════════════════════════════
          PART 1 — WHO WE ARE
      ═══════════════════════════════════════════ */}

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-teal-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {/* Large faded logo watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/Escape_to_Paradise_Logo.jpeg"
            alt=""
            className="w-[480px] md:w-[600px] opacity-10 select-none"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Prominent logo above heading */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-full p-3 shadow-2xl">
                <img
                  src="/Escape_to_Paradise_Logo.jpeg"
                  alt="Escape to Paradise"
                  className="h-28 w-28 md:h-36 md:w-36 object-contain rounded-full"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to Escape to Paradise
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-orange-100">
              Your dream vacation starts here. We make travel simple, personal, and unforgettable.
            </p>
            <p className="text-lg text-orange-200 mb-10">
              Certified travel agent · Personalized service · Expert guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('meet-audrey')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Meet Your Agent
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L1440 120L1440 0C1440 0 1080 120 720 120C360 120 0 0 0 0L0 120Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Who We Are</h2>
            <p className="text-gray-500 text-lg">The heart and purpose behind every journey we plan</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Mission */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200 shadow-sm">
              <div className="flex items-center mb-5">
                <div className="bg-orange-500 text-white rounded-full p-3 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Escape to Paradise Travel Agency, our mission is to make travel planning simple, enjoyable,
                and stress-free. We are committed to providing personalized travel experiences that meet the
                unique needs, preferences, and budgets of our clients.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                From relaxing getaways and family vacations to cruises, romantic escapes, and international
                adventures, we strive to provide exceptional service and memorable experiences from the moment
                you begin planning until you return home.
              </p>
              <p className="text-orange-600 font-semibold italic">
                Your journey is our passion, and your satisfaction is our priority.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 border border-teal-200 shadow-sm">
              <div className="flex items-center mb-5">
                <div className="bg-teal-500 text-white rounded-full p-3 mr-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our vision is to become a trusted and leading travel agency known for exceptional customer
                service, personalized travel experiences, and creating unforgettable memories around the world.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We envision a future where more people can experience the joy of travel with confidence, ease,
                and peace of mind — while building lasting relationships with our clients and travel partners.
              </p>
              <p className="text-teal-600 font-semibold italic">
                Escape the ordinary. Discover Paradise. Let us help you turn your travel dreams into reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Audrey */}
      <section id="meet-audrey" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Meet Your Travel Agent</h2>
            <p className="text-gray-500 text-lg">The person dedicated to making your dream trip a reality</p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Photo */}
              <div className="lg:w-2/5 flex-shrink-0">
                <img
                  src="/audrey-hastings.jpg"
                  alt="Audrey Hastings — Certified Travel Agent"
                  className="w-full h-80 lg:h-full object-cover object-top"
                />
              </div>
              {/* Bio */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">
                    Certified Travel Agent · InteleTravel
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Audrey Hastings</h3>
                <p className="text-gray-400 text-sm mb-6">
                  40+ Years in Sales · 26 Years in Management
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to Escape to Paradise! I'm Audrey Hastings, a Certified Travel Agent with
                  InteleTravel. My passion has always been people, travel, and creating exceptional
                  experiences — and I bring that passion to every client I serve.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Whether you're planning a relaxing getaway, a family vacation, a cruise, a romantic escape,
                  or your dream destination, I'm here to make the process simple, enjoyable, and stress-free.
                </p>
                <p className="text-orange-600 font-semibold italic mb-8">
                  "Your dream vacation starts with the right person to help you plan it. Let me help you
                  escape to paradise!"
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="self-start bg-gradient-to-r from-orange-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-teal-600 transition-all shadow-md"
                >
                  Contact Audrey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What Our Clients Say</h2>
            <p className="text-gray-500 text-lg">Real experiences from real travelers</p>
          </div>
          <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 py-16 px-8 text-center">
            <MessageSquare className="h-14 w-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              Be the first to share your experience!
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Have you traveled with Escape to Paradise? We'd love to hear about your journey.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Share Your Story
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DIVIDER
      ═══════════════════════════════════════════ */}
      <div className="bg-gradient-to-r from-orange-600 to-teal-500 py-10 text-white text-center">
        <ChevronDown className="h-8 w-8 mx-auto mb-3 opacity-60 animate-bounce" />
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to Start Your Journey?</h2>
        <p className="text-orange-100 text-lg">
          Browse our deals, request a flight, or plan your perfect trip below.
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          PART 2 — BOOK YOUR TRIP
      ═══════════════════════════════════════════ */}

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What We Offer</h2>
            <p className="text-gray-500 text-lg">Everything you need for the perfect trip</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <IconFeature key={index} icon={service.icon} title={service.title} description={service.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Request CTAs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Send Us Your Request</h2>
            <p className="text-gray-500 text-lg">
              Fill out a quick form and Audrey will get back to you with the best options
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Request Flight */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 text-center border border-gray-100">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-5">
                <Plane className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Request a Flight</h3>
              <p className="text-gray-500 mb-6">
                Tell us your destination and travel dates and we'll find the best flight options for you.
              </p>
              <button

                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Request Flight
              </button>
            </div>

            {/* Plan a Trip */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 text-center border border-gray-100">
              <div className="bg-teal-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-5">
                <Package className="h-8 w-8 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Plan a Trip</h3>
              <p className="text-gray-500 mb-6">
                Let us build your perfect itinerary — flights, hotels, activities, and more.
              </p>
              <button
                onClick={() => navigate('/plan-trip')}
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
              >
                Plan My Trip
              </button>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 text-center border border-gray-100">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-5">
                <MessageSquare className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Audrey</h3>
              <p className="text-gray-500 mb-6">
                Have a question or a special request? Send us a message and we'll reply promptly.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Popular Destinations</h2>
            <p className="text-gray-500 text-lg">Explore our most sought-after travel destinations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.slice(0, 3).map((dest, index) => (
              <DestinationCard
                key={index}
                name={dest.name}
                imageUrl={dest.imageUrl}
                description={dest.description}

              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-3xl mx-auto">
            {destinations.slice(3).map((dest, index) => (
              <DestinationCard
                key={index}
                name={dest.name}
                imageUrl={dest.imageUrl}
                description={dest.description}

              />
            ))}
          </div>
        </div>
      </section>

      {/* Current Deals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Current Travel Deals
            </h2>
            <p className="text-gray-500 text-lg">Limited-time offers on amazing destinations</p>
          </div>
          {dealsLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-gray-500">Loading deals...</p>
            </div>
          ) : deals.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <Package className="h-14 w-14 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-1">No deals available right now.</p>
              <p className="text-gray-400">Check back soon — new offers are added regularly!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {deals.map((deal) => (
                  <DealCard
                    key={deal.id}
                    destination={deal.destination}
                    route={deal.route}
                    price={deal.price}
                    travelDates={deal.travelDates}
                    imageUrl={deal.imageUrl}
                    imageAlt={deal.imageAlt}
                    category={deal.category}
                    onBookNow={() => navigate('/deals')}
                    onMoreInfo={() => setSelectedDeal(deal)}
                  />
                ))}
              </div>
              <div className="text-center mt-10">
                <button
                  onClick={() => navigate('/deals')}
                  className="bg-gradient-to-r from-orange-500 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg"
                >
                  View All Deals
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Book With a Travel Agent */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Book With a Travel Agent?
            </h2>
            <p className="text-gray-500 text-lg">Experience the difference of personalized travel planning</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <IconFeature key={index} icon={benefit.icon} title={benefit.title} description={benefit.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Make Your Dream Trip a Reality
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Reach out to Audrey today and start planning your perfect escape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/plan-trip')}
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Plan My Trip
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Deal Details Modal */}
      {selectedDeal && (
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
                onClick={() => setSelectedDeal(null)}
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
                  {selectedDeal.details?.duration && (
                    <div className="text-sm text-gray-500">{selectedDeal.details.duration}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Starting from</div>
                  <div className="text-4xl font-bold text-orange-600">${selectedDeal.price}</div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>
              </div>

              {/* Description */}
              {selectedDeal.details?.description && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About This Package</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedDeal.details.description}</p>
                </div>
              )}

              {/* Quick Info */}
              {(selectedDeal.details?.duration || selectedDeal.details?.groupSize || selectedDeal.details?.accommodation) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {selectedDeal.details?.duration && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                        <span className="font-semibold text-gray-900">Duration</span>
                      </div>
                      <p className="text-gray-600 text-sm">{selectedDeal.details.duration}</p>
                    </div>
                  )}
                  {selectedDeal.details?.groupSize && (
                    <div className="bg-teal-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 text-teal-600 mr-2" />
                        <span className="font-semibold text-gray-900">Group Size</span>
                      </div>
                      <p className="text-gray-600 text-sm">{selectedDeal.details.groupSize}</p>
                    </div>
                  )}
                  {selectedDeal.details?.accommodation && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Bed className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-gray-900">Accommodation</span>
                      </div>
                      <p className="text-gray-600 text-sm">{selectedDeal.details.accommodation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* What's Included */}
              {selectedDeal.details?.includes && selectedDeal.details.includes.length > 0 && (
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
              )}

              {/* Meals */}
              {selectedDeal.details?.meals && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Utensils className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="font-semibold text-gray-900">Meals Included</span>
                  </div>
                  <p className="text-gray-600">{selectedDeal.details.meals}</p>
                </div>
              )}

              {/* Highlights */}
              {selectedDeal.details?.highlights && selectedDeal.details.highlights.length > 0 && (
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
              )}

              {/* Request Button */}
              <button
                onClick={() =>
                  navigate('/request-deal', {
                    state: {
                      dealName: selectedDeal.destination,
                      dealRoute: selectedDeal.route,
                      dealPrice: selectedDeal.price,
                      dealDates: selectedDeal.travelDates,
                    },
                  })
                }
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
