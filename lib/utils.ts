import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${(distance * 5280).toFixed(0)} ft`;
  }
  return `${distance.toFixed(1)} mi`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getInsurancePlans(): string[] {
  return [
    'Medicaid',
    'CHIP (Children\'s Health Insurance)',
    'Medicare',
    'Marketplace Plan',
    'Uninsured',
    'Other'
  ];
}

export function getSpecialties(): string[] {
  return [
    'Primary Care',
    'Pediatrics',
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'Neurology',
    'Obstetrics & Gynecology',
    'Orthopedics',
    'Psychiatry',
    'Pulmonology',
    'Rheumatology',
    'Urology',
    'Other'
  ];
}

export function generateMockProviders(specialty: string, insurancePlan: string): any[] {
  const mockProviders = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: specialty,
      address: '123 Main St, Anytown, ST 12345',
      phone: '(555) 123-4567',
      acceptedInsurance: [insurancePlan, 'Medicare', 'Medicaid'],
      rating: 4.8,
      reviewCount: 127,
      distance: 0.8,
      availability: 'Next available: Tomorrow'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: specialty,
      address: '456 Oak Ave, Anytown, ST 12345',
      phone: '(555) 234-5678',
      acceptedInsurance: [insurancePlan, 'CHIP'],
      rating: 4.6,
      reviewCount: 89,
      distance: 1.2,
      availability: 'Next available: Next week'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: specialty,
      address: '789 Pine Rd, Anytown, ST 12345',
      phone: '(555) 345-6789',
      acceptedInsurance: [insurancePlan, 'Medicaid', 'Medicare'],
      rating: 4.9,
      reviewCount: 203,
      distance: 2.1,
      availability: 'Next available: This week'
    }
  ];

  return mockProviders;
}

export function generateMockBenefits(inquiryDetails: any): any[] {
  const mockBenefits = [
    {
      id: '1',
      name: 'Prescription Assistance Program',
      description: 'Reduced-cost medications for qualifying individuals',
      eligibilityRequirements: ['Income below 200% of Federal Poverty Level', 'No prescription coverage'],
      applicationProcess: 'Apply online or call 1-800-XXX-XXXX',
      estimatedSavings: 150,
      category: 'prescription'
    },
    {
      id: '2',
      name: 'Transportation Vouchers',
      description: 'Free or reduced-cost transportation to medical appointments',
      eligibilityRequirements: ['Medicaid recipient', 'No reliable transportation'],
      applicationProcess: 'Contact your Medicaid case worker',
      estimatedSavings: 50,
      category: 'transportation'
    },
    {
      id: '3',
      name: 'Dental Care Program',
      description: 'Low-cost dental services at community health centers',
      eligibilityRequirements: ['Income below 150% of Federal Poverty Level'],
      applicationProcess: 'Visit participating community health center',
      estimatedSavings: 200,
      category: 'dental'
    }
  ];

  return mockBenefits;
}

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
