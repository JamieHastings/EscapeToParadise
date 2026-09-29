import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/Escape_to_Paradise_Logo.jpeg"
                alt="Escape to Paradise"
                className="h-12 w-12 object-contain"
              />
              <span className="text-xl font-bold text-white">Escape to Paradise</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your trusted travel partner for unforgettable journeys. We specialize in
              personalized travel planning with access to exclusive deals and expert guidance. Freedom Awaits!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-pink-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-sky-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search-flights" className="hover:text-orange-400 transition-colors">
                  Search Flights
                </Link>
              </li>
              <li>
                <Link to="/deals" className="hover:text-orange-400 transition-colors">
                  Travel Deals
                </Link>
              </li>
              <li>
                <Link to="/plan-trip" className="hover:text-orange-400 transition-colors">
                  Plan My Trip
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-orange-400 shrink-0" />
                <a
                  href="mailto:audreyh@escape2paradisetravels.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  audreyh@escape2paradisetravels.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <a
                  href="tel:+18765774620"
                  className="hover:text-orange-400 transition-colors"
                >
                  +1 (876) 577-4620
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Escape to Paradise. All rights reserved.</p>
          <p className="mt-2">
            Affiliated with InteleTravel | Freedom Awaits
          </p>
        </div>
      </div>
    </footer>
  );
}
