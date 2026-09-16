import { Calendar, DollarSign, ArrowRight, Info } from 'lucide-react';

interface DealCardProps {
  destination: string;
  route: string;
  price: string;
  travelDates: string;
  imageUrl: string;
  category: string;
  onBookNow: () => void;
  onMoreInfo?: () => void;
}

export default function DealCard({ destination, route, price, travelDates, imageUrl, onBookNow, onMoreInfo }: DealCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt={destination}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          Hot Deal
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{destination}</h3>
        <p className="text-gray-600 mb-4 flex items-center">
          <ArrowRight className="h-4 w-4 mx-2" />
          {route}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-teal-500" />
            <span>{travelDates}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-bold text-green-600">{price}</span>
            <span className="text-gray-500 text-sm ml-1">per person</span>
          </div>
        </div>

        {onMoreInfo ? (
          <button
            onClick={onMoreInfo}
            className="w-full bg-gradient-to-r from-orange-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            <Info className="h-5 w-5 mr-2" />
            More Info
          </button>
        ) : (
          <button
            onClick={onBookNow}
            className="w-full bg-gradient-to-r from-orange-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Request This Deal
          </button>
        )}
      </div>
    </div>
  );
}
