// User data model
export interface User {
  fid: string;
  walletAddress?: string;
  preferences?: UserPreferences;
  searchHistory?: ProviderSearch[];
}

export interface UserPreferences {
  insurancePlan?: string;
  location?: string;
  preferredLanguage?: string;
  notifications?: boolean;
}

// Provider search data model
export interface ProviderSearch {
  id: string;
  userId: string;
  insurancePlan: string;
  specialty: string;
  location: string;
  results: Provider[];
  timestamp: Date;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  acceptedInsurance: string[];
  rating: number;
  reviewCount: number;
  distance?: number;
  availability?: string;
}

// Benefit inquiry data model
export interface BenefitInquiry {
  id: string;
  userId: string;
  inquiryDetails: InquiryDetails;
  potentialBenefits: Benefit[];
  timestamp: Date;
}

export interface InquiryDetails {
  householdSize: number;
  income: number;
  currentInsurance: string;
  medicalConditions?: string[];
  location: string;
}

export interface Benefit {
  id: string;
  name: string;
  description: string;
  eligibilityRequirements: string[];
  applicationProcess: string;
  estimatedSavings?: number;
  category: 'prescription' | 'dental' | 'vision' | 'mental_health' | 'transportation' | 'other';
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component prop types
export interface SearchFilters {
  specialty: string;
  insurancePlan: string;
  location: string;
  radius?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Navigation types
export type NavigationStep = 'home' | 'provider-search' | 'benefits-check' | 'appointment-help' | 'results';

export interface AppState {
  currentStep: NavigationStep;
  user?: User;
  searchResults?: Provider[];
  benefitResults?: Benefit[];
  isLoading: boolean;
  error?: string;
}
