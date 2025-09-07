'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Heart, Menu, ArrowLeft } from 'lucide-react';
import { NavigationStep } from '@/lib/types';

interface AppShellProps {
  children: React.ReactNode;
  currentStep: NavigationStep;
  onNavigate: (step: NavigationStep) => void;
  title?: string;
}

export function AppShell({ children, currentStep, onNavigate, title }: AppShellProps) {
  const { setFrameReady } = useMiniKit();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const getTitle = () => {
    if (title) return title;
    
    switch (currentStep) {
      case 'home':
        return 'HealthBridge';
      case 'provider-search':
        return 'Find Providers';
      case 'benefits-check':
        return 'Check Benefits';
      case 'appointment-help':
        return 'Appointment Help';
      case 'results':
        return 'Results';
      default:
        return 'HealthBridge';
    }
  };

  const canGoBack = currentStep !== 'home';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600">
      {/* Header */}
      <header className="glass-card rounded-none border-0 border-b border-white border-opacity-20">
        <div className="max-w-sm mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {canGoBack ? (
              <button
                onClick={() => onNavigate('home')}
                className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            ) : (
              <div className="p-2 rounded-lg bg-white bg-opacity-20">
                <Heart className="w-5 h-5 text-white" />
              </div>
            )}
            <h1 className="text-xl font-semibold text-white text-shadow">
              {getTitle()}
            </h1>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-white border-opacity-20 bg-white bg-opacity-10 backdrop-blur-md">
            <div className="max-w-sm mx-auto px-4 py-2">
              <nav className="space-y-1">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-all duration-200"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    onNavigate('provider-search');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-all duration-200"
                >
                  Find Providers
                </button>
                <button
                  onClick={() => {
                    onNavigate('benefits-check');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-all duration-200"
                >
                  Check Benefits
                </button>
                <button
                  onClick={() => {
                    onNavigate('appointment-help');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-white hover:bg-opacity-20 rounded-md transition-all duration-200"
                >
                  Appointment Help
                </button>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-sm mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="max-w-sm mx-auto px-4 py-4 text-center">
        <p className="text-white text-opacity-70 text-sm">
          Navigate healthcare with confidence and ease
        </p>
      </footer>
    </div>
  );
}
