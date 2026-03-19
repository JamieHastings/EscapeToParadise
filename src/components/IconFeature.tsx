import type { LucideIcon } from 'lucide-react';

interface IconFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function IconFeature({ icon: Icon, title, description }: IconFeatureProps) {
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 text-white mb-4 group-hover:scale-110 transition-transform">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
