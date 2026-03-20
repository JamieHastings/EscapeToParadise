import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Ship, Package, Shield, DollarSign, Clock, Heart } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import DealCard from '../components/DealCard';
import TestimonialCard from '../components/TestimonialCard';
import IconFeature from '../components/IconFeature';

export default function Home() {
  const navigate = useNavigate();

  const destinations = [
    {
      name: 'Miami',
      imageUrl: 'https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Beautiful beaches, vibrant nightlife, and Art Deco architecture',
    },
    {
      name: 'New York',
      imageUrl: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'The city that never sleeps with iconic landmarks and culture',
    },
    {
      name: 'Punta Cana',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Paradise beaches, crystal-clear waters, and all-inclusive resorts',
    },
    {
      name: 'Toronto',
      imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Multicultural metropolis with world-class dining and entertainment',
    },
    {
      name: 'Bahamas',
      imageUrl: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Tropical paradise with pristine beaches and turquoise waters',
    },
    {
      name: 'London',
      imageUrl: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Historic landmarks, royal palaces, and world-class museums',
    },
  ];

  const deals = [
    {
      destination: 'Miami Beach Getaway',
      route: 'Kingston → Miami',
      price: '299',
      travelDates: 'Apr 15 - Apr 22, 2026',
      imageUrl: 'https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'Punta Cana All-Inclusive',
      route: 'Kingston → Punta Cana',
      price: '599',
      travelDates: 'May 1 - May 8, 2026',
      imageUrl: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      destination: 'New York City Explorer',
      route: 'Kingston → New York',
      price: '399',
      travelDates: 'Jun 10 - Jun 17, 2026',
      imageUrl: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Kingston, Jamaica',
      rating: 5,
      comment: 'Amazing service! They found us the perfect honeymoon package to Punta Cana. Every detail was handled professionally.',
    },
    {
      name: 'Michael Brown',
      location: 'Montego Bay, Jamaica',
      rating: 5,
      comment: 'Best travel agent I\'ve worked with. Saved me so much time and money on our family vacation to Miami.',
    },
    {
      name: 'Jennifer Williams',
      location: 'Ocho Rios, Jamaica',
      rating: 5,
      comment: 'Highly recommend! They helped us plan an incredible Caribbean cruise. Will definitely book with them again.',
    },
  ];

  const services = [
    {
      icon: Plane,
      title: 'Flight Bookings',
      description: 'Access to competitive flight prices and flexible booking options',
    },
    {
      icon: Hotel,
      title: 'Hotel Reservations',
      description: 'Handpicked accommodations from budget to luxury worldwide',
    },
    {
      icon: Ship,
      title: 'Cruise Packages',
      description: 'Exclusive cruise deals with top cruise lines and destinations',
    },
    {
      icon: Package,
      title: 'Vacation Packages',
      description: 'All-inclusive packages combining flights, hotels, and activities',
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Expert Guidance',
      description: 'Professional travel advice from certified agents with InteleTravel',
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'Access to exclusive deals and competitive rates you won\'t find online',
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'We handle all the research and booking details for you',
    },
    {
      icon: Heart,
      title: 'Personalized Service',
      description: 'Tailored travel planning based on your preferences and budget',
    },
  ];

  const handleBookNow = () => {
    window.open('https://www.inteletravel.com', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-teal-500 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Request Your Perfect Flight
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Tell us where you want to go and our travel experts will find the best flight options for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/request-flight')}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Request a Flight
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105"
              >
                Contact Agent
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L1440 120L1440 0C1440 0 1080 120 720 120C360 120 0 0 0 0L0 120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <IconFeature
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our most sought-after travel destinations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.slice(0, 3).map((dest, index) => (
              <DestinationCard
                key={index}
                name={dest.name}
                imageUrl={dest.imageUrl}
                description={dest.description}
                onClick={() => navigate('/search-flights')}
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
                onClick={() => navigate('/search-flights')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Current Deals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Travel Deals
            </h2>
            <p className="text-gray-600 text-lg">
              Limited time offers on amazing destinations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal, index) => (
              <DealCard
                key={index}
                destination={deal.destination}
                route={deal.route}
                price={deal.price}
                travelDates={deal.travelDates}
                imageUrl={deal.imageUrl}
                category="Package"
                onBookNow={handleBookNow}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/deals')}
              className="bg-gradient-to-r from-orange-500 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-md hover:shadow-lg"
            >
              View All Deals
            </button>
          </div>
        </div>
      </section>

      {/* Why Book With a Travel Agent */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Book With a Travel Agent?
            </h2>
            <p className="text-gray-600 text-lg">
              Experience the difference of personalized travel planning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <IconFeature
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 text-lg">
              Real experiences from real travelers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                location={testimonial.location}
                rating={testimonial.rating}
                comment={testimonial.comment}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let us help you plan the perfect vacation tailored to your dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/plan-trip')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Plan My Trip
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
