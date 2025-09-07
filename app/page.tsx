'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { ProviderCard } from '@/components/ProviderCard';
import { BenefitAlert } from '@/components/BenefitAlert';
import { AgentChat } from '@/components/AgentChat';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { NavigationStep, Provider, Benefit, SearchFilters, InquiryDetails } from '@/lib/types';
import { getInsurancePlans, getSpecialties, generateMockProviders, generateMockBenefits, delay } from '@/lib/utils';
import { analyzeBenefitEligibility } from '@/lib/openai';
import { Search, Heart, Shield, Calendar, Users, MapPin, DollarSign, Phone, Clock } from 'lucide-react';

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<NavigationStep>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Provider[]>([]);
  const [benefitResults, setBenefitResults] = useState<Benefit[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    specialty: '',
    insurancePlan: '',
    location: ''
  });
  const [inquiryDetails, setInquiryDetails] = useState<InquiryDetails>({
    householdSize: 1,
    income: 0,
    currentInsurance: '',
    location: ''
  });

  const handleProviderSearch = async () => {
    if (!searchFilters.specialty || !searchFilters.insurancePlan || !searchFilters.location) {
      return;
    }

    setIsLoading(true);
    setCurrentStep('results');

    try {
      // Simulate API delay
      await delay(1500);
      
      const mockResults = generateMockProviders(searchFilters.specialty, searchFilters.insurancePlan);
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Provider search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBenefitCheck = async () => {
    if (!inquiryDetails.currentInsurance || !inquiryDetails.location || inquiryDetails.income <= 0) {
      return;
    }

    setIsLoading(true);
    setCurrentStep('results');

    try {
      // Simulate API delay
      await delay(1500);
      
      const mockBenefits = generateMockBenefits(inquiryDetails);
      setBenefitResults(mockBenefits);
      
      // Get AI analysis
      await analyzeBenefitEligibility(inquiryDetails);
    } catch (error) {
      console.error('Benefit check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHome = () => (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white text-shadow">
          HealthBridge
        </h1>
        <p className="text-white text-opacity-90 text-lg">
          Navigate healthcare with confidence and ease
        </p>
      </div>

      {/* Feature Cards */}
      <div className="space-y-4">
        <div 
          className="feature-card"
          onClick={() => setCurrentStep('provider-search')}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-500 bg-opacity-30 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                Find Providers
              </h3>
              <p className="text-white text-opacity-80 text-sm">
                Search for doctors who accept your insurance
              </p>
            </div>
          </div>
        </div>

        <div 
          className="feature-card"
          onClick={() => setCurrentStep('benefits-check')}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-accent-500 bg-opacity-30 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                Check Benefits
              </h3>
              <p className="text-white text-opacity-80 text-sm">
                Discover additional healthcare benefits you may qualify for
              </p>
            </div>
          </div>
        </div>

        <div 
          className="feature-card"
          onClick={() => setCurrentStep('appointment-help')}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500 bg-opacity-30 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                Appointment Help
              </h3>
              <p className="text-white text-opacity-80 text-sm">
                Get assistance with scheduling and transportation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="glass-card p-4">
        <h3 className="text-white font-semibold mb-3">How We Help</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-white text-opacity-70 text-sm">Providers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-white text-opacity-70 text-sm">Benefits</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProviderSearch = () => (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Find Healthcare Providers
        </h2>
        <p className="text-white text-opacity-80">
          Search for doctors who accept your insurance plan
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            What type of doctor do you need?
          </label>
          <select
            value={searchFilters.specialty}
            onChange={(e) => setSearchFilters(prev => ({ ...prev, specialty: e.target.value }))}
            className="input-field"
          >
            <option value="">Select specialty</option>
            {getSpecialties().map(specialty => (
              <option key={specialty} value={specialty} className="text-gray-900">
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            What insurance do you have?
          </label>
          <select
            value={searchFilters.insurancePlan}
            onChange={(e) => setSearchFilters(prev => ({ ...prev, insurancePlan: e.target.value }))}
            className="input-field"
          >
            <option value="">Select insurance plan</option>
            {getInsurancePlans().map(plan => (
              <option key={plan} value={plan} className="text-gray-900">
                {plan}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Your location (ZIP code or city)
          </label>
          <input
            type="text"
            value={searchFilters.location}
            onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Enter ZIP code or city"
            className="input-field"
          />
        </div>

        <button
          onClick={handleProviderSearch}
          disabled={!searchFilters.specialty || !searchFilters.insurancePlan || !searchFilters.location}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search Providers
        </button>
      </div>
    </div>
  );

  const renderBenefitsCheck = () => (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Check Your Benefits
        </h2>
        <p className="text-white text-opacity-80">
          Find additional healthcare benefits you may qualify for
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Household size
          </label>
          <input
            type="number"
            min="1"
            value={inquiryDetails.householdSize}
            onChange={(e) => setInquiryDetails(prev => ({ ...prev, householdSize: parseInt(e.target.value) || 1 }))}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Annual household income
          </label>
          <input
            type="number"
            min="0"
            value={inquiryDetails.income || ''}
            onChange={(e) => setInquiryDetails(prev => ({ ...prev, income: parseInt(e.target.value) || 0 }))}
            placeholder="Enter annual income"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Current insurance
          </label>
          <select
            value={inquiryDetails.currentInsurance}
            onChange={(e) => setInquiryDetails(prev => ({ ...prev, currentInsurance: e.target.value }))}
            className="input-field"
          >
            <option value="">Select current insurance</option>
            {getInsurancePlans().map(plan => (
              <option key={plan} value={plan} className="text-gray-900">
                {plan}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Your location
          </label>
          <input
            type="text"
            value={inquiryDetails.location}
            onChange={(e) => setInquiryDetails(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Enter ZIP code or city"
            className="input-field"
          />
        </div>

        <button
          onClick={handleBenefitCheck}
          disabled={!inquiryDetails.currentInsurance || !inquiryDetails.location || inquiryDetails.income <= 0}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Benefits
        </button>
      </div>
    </div>
  );

  const renderAppointmentHelp = () => (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Appointment Assistant
        </h2>
        <p className="text-white text-opacity-80">
          Get help with scheduling and preparing for appointments
        </p>
      </div>

      <AgentChat
        variant="full"
        initialMessage="Hi! I'm here to help you with appointment scheduling, transportation options, and preparing for your medical visits. What can I assist you with today?"
      />

      {/* Quick Help Options */}
      <div className="space-y-3">
        <h3 className="text-white font-medium">Common Questions:</h3>
        <div className="space-y-2">
          <button className="w-full text-left p-3 glass-card hover:bg-opacity-15 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-white text-opacity-70" />
              <span className="text-white text-sm">How do I schedule an appointment?</span>
            </div>
          </button>
          <button className="w-full text-left p-3 glass-card hover:bg-opacity-15 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-white text-opacity-70" />
              <span className="text-white text-sm">Transportation assistance options</span>
            </div>
          </button>
          <button className="w-full text-left p-3 glass-card hover:bg-opacity-15 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-white text-opacity-70" />
              <span className="text-white text-sm">What should I bring to my appointment?</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (isLoading) {
      return (
        <LoadingSpinner 
          size="lg" 
          message={searchResults.length > 0 || searchFilters.specialty ? "Finding providers..." : "Checking benefits..."}
        />
      );
    }

    if (searchResults.length > 0) {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Provider Results
            </h2>
            <p className="text-white text-opacity-80">
              Found {searchResults.length} providers for {searchFilters.specialty}
            </p>
          </div>

          <div className="space-y-4">
            {searchResults.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onSelect={(provider) => {
                  // Handle provider selection
                  console.log('Selected provider:', provider);
                }}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setSearchResults([]);
              setCurrentStep('provider-search');
            }}
            className="w-full btn-secondary"
          >
            Search Again
          </button>
        </div>
      );
    }

    if (benefitResults.length > 0) {
      return (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Potential Benefits
            </h2>
            <p className="text-white text-opacity-80">
              You may qualify for these {benefitResults.length} benefits
            </p>
          </div>

          <div className="space-y-4">
            {benefitResults.map((benefit) => (
              <BenefitAlert
                key={benefit.id}
                benefit={benefit}
                variant="success"
                onLearnMore={(benefit) => {
                  // Handle learn more
                  console.log('Learn more about:', benefit);
                }}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setBenefitResults([]);
              setCurrentStep('benefits-check');
            }}
            className="w-full btn-secondary"
          >
            Check Again
          </button>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <p className="text-white text-opacity-80">
          No results found. Please try again.
        </p>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'home':
        return renderHome();
      case 'provider-search':
        return renderProviderSearch();
      case 'benefits-check':
        return renderBenefitsCheck();
      case 'appointment-help':
        return renderAppointmentHelp();
      case 'results':
        return renderResults();
      default:
        return renderHome();
    }
  };

  return (
    <AppShell
      currentStep={currentStep}
      onNavigate={setCurrentStep}
    >
      {renderCurrentStep()}
    </AppShell>
  );
}
