'use client';

import { Provider } from '@/lib/types';
import { formatPhoneNumber, formatDistance, formatRating } from '@/lib/utils';
import { MapPin, Phone, Star, Clock } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  variant?: 'horizontal' | 'vertical';
  onSelect?: (provider: Provider) => void;
}

export function ProviderCard({ 
  provider, 
  variant = 'horizontal',
  onSelect 
}: ProviderCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(provider);
    }
  };

  return (
    <div 
      className={`provider-card ${onSelect ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            {provider.name}
          </h3>
          <p className="text-white text-opacity-80 text-sm mb-2">
            {provider.specialty}
          </p>
        </div>
        
        <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-2 py-1 rounded-md">
          <Star className="w-4 h-4 text-yellow-300 fill-current" />
          <span className="text-white text-sm font-medium">
            {formatRating(provider.rating)}
          </span>
          <span className="text-white text-opacity-70 text-xs">
            ({provider.reviewCount})
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-white text-opacity-70 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-white text-opacity-90 text-sm">
              {provider.address}
            </p>
            {provider.distance && (
              <p className="text-white text-opacity-70 text-xs mt-1">
                {formatDistance(provider.distance)} away
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-white text-opacity-70 flex-shrink-0" />
          <p className="text-white text-opacity-90 text-sm">
            {formatPhoneNumber(provider.phone)}
          </p>
        </div>

        {provider.availability && (
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-white text-opacity-70 flex-shrink-0" />
            <p className="text-white text-opacity-90 text-sm">
              {provider.availability}
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-white border-opacity-20">
        <div className="flex flex-wrap gap-1">
          {provider.acceptedInsurance.slice(0, 3).map((insurance, index) => (
            <span
              key={index}
              className="inline-block bg-accent-500 bg-opacity-20 text-white text-xs px-2 py-1 rounded-md"
            >
              {insurance}
            </span>
          ))}
          {provider.acceptedInsurance.length > 3 && (
            <span className="inline-block text-white text-opacity-70 text-xs px-2 py-1">
              +{provider.acceptedInsurance.length - 3} more
            </span>
          )}
        </div>
      </div>

      {onSelect && (
        <div className="mt-4">
          <button className="w-full btn-secondary text-sm">
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
