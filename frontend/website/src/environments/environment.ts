export interface Environment {
  production: boolean;
  apiBaseUrl: string;
  dataMode: 'mock' | 'api';
  siteUrl: string;
  siteName: string;
  defaultCurrency: string;
  contactEmail: string;
  supportPhone: string;
}

export const environment: Environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8787/api/v1',
  dataMode: 'mock', // Set to 'api' to fetch from real backend, or 'mock' for realistic demo data
  siteUrl: 'https://travellerai.com',
  siteName: 'TravellerAI',
  defaultCurrency: 'USD',
  contactEmail: 'concierge@travellerai.com',
  supportPhone: '+1 (800) 555-TRAV',
};
