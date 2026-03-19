import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
}

export default function TestimonialCard({ name, location, rating, comment, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        {avatar ? (
          <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover mr-4" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg mr-4">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      <p className="text-gray-600 italic">"{comment}"</p>
    </div>
  );
}
