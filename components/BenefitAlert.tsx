'use client';

import { Benefit } from '@/lib/types';
import { CheckCircle, Info, DollarSign, ExternalLink } from 'lucide-react';

interface BenefitAlertProps {
  benefit: Benefit;
  variant?: 'success' | 'info';
  onLearnMore?: (benefit: Benefit) => void;
}

export function BenefitAlert({ 
  benefit, 
  variant = 'info',
  onLearnMore 
}: BenefitAlertProps) {
  const Icon = variant === 'success' ? CheckCircle : Info;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'prescription':
        return 'text-blue-300';
      case 'dental':
        return 'text-green-300';
      case 'vision':
        return 'text-purple-300';
      case 'mental_health':
        return 'text-pink-300';
      case 'transportation':
        return 'text-yellow-300';
      default:
        return 'text-gray-300';
    }
  };

  return (
    <div className={`benefit-alert ${variant}`}>
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
          variant === 'success' ? 'text-accent-500' : 'text-primary-500'
        }`} />
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-semibold text-lg">
              {benefit.name}
            </h3>
            {benefit.estimatedSavings && (
              <div className="flex items-center space-x-1 bg-white bg-opacity-20 px-2 py-1 rounded-md">
                <DollarSign className="w-4 h-4 text-green-300" />
                <span className="text-white text-sm font-medium">
                  ${benefit.estimatedSavings}/mo
                </span>
              </div>
            )}
          </div>

          <p className="text-white text-opacity-90 text-sm mb-3">
            {benefit.description}
          </p>

          <div className="space-y-2 mb-3">
            <h4 className="text-white text-opacity-80 text-sm font-medium">
              Eligibility Requirements:
            </h4>
            <ul className="space-y-1">
              {benefit.eligibilityRequirements.map((requirement, index) => (
                <li key={index} className="text-white text-opacity-70 text-sm flex items-start space-x-2">
                  <span className="w-1 h-1 bg-white bg-opacity-50 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="text-white text-opacity-80 text-sm font-medium mb-1">
              How to Apply:
            </h4>
            <p className="text-white text-opacity-70 text-sm">
              {benefit.applicationProcess}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-md bg-white bg-opacity-20 ${getCategoryColor(benefit.category)}`}>
              {benefit.category.replace('_', ' ').toUpperCase()}
            </span>
            
            {onLearnMore && (
              <button
                onClick={() => onLearnMore(benefit)}
                className="flex items-center space-x-1 text-white text-opacity-80 hover:text-opacity-100 text-sm transition-all duration-200"
              >
                <span>Learn More</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
