import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  name: string;
  imageUrl: string;
  description: string;
  onClick?: () => void;
}

export default function DestinationCard({ name, imageUrl, description, onClick }: DestinationCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
