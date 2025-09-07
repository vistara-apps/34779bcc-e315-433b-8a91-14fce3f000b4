import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 flex items-center justify-center">
      <LoadingSpinner size="lg" message="Loading HealthBridge..." />
    </div>
  );
}
