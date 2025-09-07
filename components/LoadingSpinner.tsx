'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className={`${sizeClasses[size]} border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin`}></div>
      {message && (
        <p className="text-white text-opacity-80 text-sm text-center">
          {message}
        </p>
      )}
    </div>
  );
}
