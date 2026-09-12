export interface ClientOptions {
  baseUrl?: string;
  token?: string;
  fetch?: typeof fetch;
}

/**
 * @author arefin
 * @description Zero-dependency type-safe API Client for traveller-api
 */
export class TravellerApiClient {
  private baseUrl: string;
  private token?: string;
  private customFetch: typeof fetch;

  constructor(options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? 'http://localhost:8787').replace(/\/$/, '');
    this.token = options.token;
    this.customFetch = options.fetch ?? globalThis.fetch;
  }

  /**
   * @author arefin
   * @description Make an authenticated HTTP request to the API
   */
  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    const response = await this.customFetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    return (await response.json()) as T;
  }


  /**
   * @author arefin
   * @description API operations for User entity
   */
  public user = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/users${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/users/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/users`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/users/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/users/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Destination entity
   */
  public destination = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/destinations${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/destinations/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/destinations`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/destinations/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/destinations/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Category entity
   */
  public category = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/categories${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/categories/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/categories`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/categories/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/categories/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Provider entity
   */
  public provider = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/providers${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/providers/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/providers`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/providers/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/providers/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for ProviderStaff entity
   */
  public providerStaff = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/provider-staffs${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/provider-staffs/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/provider-staffs`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/provider-staffs/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/provider-staffs/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for KycDocument entity
   */
  public kycDocument = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/kyc-documents${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/kyc-documents/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/kyc-documents`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/kyc-documents/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/kyc-documents/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for ProviderPayoutAccount entity
   */
  public providerPayoutAccount = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/provider-payout-accounts${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/provider-payout-accounts/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/provider-payout-accounts`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/provider-payout-accounts/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/provider-payout-accounts/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Amenity entity
   */
  public amenity = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/amenities${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/amenities/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/amenities`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/amenities/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/amenities/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for GuideProfile entity
   */
  public guideProfile = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/guide-profiles${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/guide-profiles/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/guide-profiles`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/guide-profiles/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/guide-profiles/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Package entity
   */
  public package = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/packages${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/packages/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/packages`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/packages/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/packages/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for ItineraryItem entity
   */
  public itineraryItem = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/itinerary-items${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/itinerary-items/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/itinerary-items`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/itinerary-items/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/itinerary-items/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for PackageFaq entity
   */
  public packageFaq = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/package-faqs${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/package-faqs/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/package-faqs`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/package-faqs/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/package-faqs/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for PackageAddon entity
   */
  public packageAddon = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/package-addons${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/package-addons/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/package-addons`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/package-addons/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/package-addons/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Departure entity
   */
  public departure = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/departures${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/departures/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/departures`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/departures/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/departures/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Waitlist entity
   */
  public waitlist = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/waitlists${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/waitlists/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/waitlists`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/waitlists/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/waitlists/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for PriceRule entity
   */
  public priceRule = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/price-rules${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/price-rules/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/price-rules`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/price-rules/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/price-rules/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for ExchangeRate entity
   */
  public exchangeRate = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/exchange-rates${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/exchange-rates/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/exchange-rates`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/exchange-rates/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/exchange-rates/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Booking entity
   */
  public booking = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/bookings${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/bookings/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/bookings`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/bookings/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/bookings/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for BookingParticipant entity
   */
  public bookingParticipant = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/booking-participants${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/booking-participants/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/booking-participants`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/booking-participants/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/booking-participants/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for BookingAddonItem entity
   */
  public bookingAddonItem = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/booking-addon-items${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/booking-addon-items/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/booking-addon-items`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/booking-addon-items/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/booking-addon-items/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for PaymentTransaction entity
   */
  public paymentTransaction = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/payment-transactions${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/payment-transactions/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/payment-transactions`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/payment-transactions/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/payment-transactions/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for LedgerEntry entity
   */
  public ledgerEntry = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/ledger-entries${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/ledger-entries/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/ledger-entries`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/ledger-entries/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/ledger-entries/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for ProviderWallet entity
   */
  public providerWallet = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/provider-wallets${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/provider-wallets/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/provider-wallets`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/provider-wallets/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/provider-wallets/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for CustomerWallet entity
   */
  public customerWallet = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/customer-wallets${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/customer-wallets/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/customer-wallets`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/customer-wallets/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/customer-wallets/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for WithdrawalRequest entity
   */
  public withdrawalRequest = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/withdrawal-requests${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/withdrawal-requests/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/withdrawal-requests`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/withdrawal-requests/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/withdrawal-requests/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for RefundRequest entity
   */
  public refundRequest = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/refund-requests${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/refund-requests/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/refund-requests`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/refund-requests/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/refund-requests/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Dispute entity
   */
  public dispute = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/disputes${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/disputes/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/disputes`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/disputes/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/disputes/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Coupon entity
   */
  public coupon = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/coupons${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/coupons/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/coupons`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/coupons/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/coupons/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for GiftCard entity
   */
  public giftCard = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/gift-cards${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/gift-cards/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/gift-cards`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/gift-cards/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/gift-cards/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for LoyaltyAccount entity
   */
  public loyaltyAccount = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/loyalty-accounts${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/loyalty-accounts/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/loyalty-accounts`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/loyalty-accounts/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/loyalty-accounts/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for AffiliateAccount entity
   */
  public affiliateAccount = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/affiliate-accounts${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/affiliate-accounts/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/affiliate-accounts`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/affiliate-accounts/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/affiliate-accounts/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for Review entity
   */
  public review = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/reviews${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/reviews/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/reviews`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/reviews/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/reviews/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for ReviewResponse entity
   */
  public reviewResponse = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/review-responses${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/review-responses/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/review-responses`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/review-responses/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/review-responses/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for SupportTicket entity
   */
  public supportTicket = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/support-tickets${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/support-tickets/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/support-tickets`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/support-tickets/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/support-tickets/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for TicketMessage entity
   */
  public ticketMessage = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/ticket-messages${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/ticket-messages/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/ticket-messages`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/ticket-messages/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/ticket-messages/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for TripInquiry entity
   */
  public tripInquiry = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/trip-inquiries${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/trip-inquiries/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/trip-inquiries`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/trip-inquiries/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/trip-inquiries/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for ProviderQuotation entity
   */
  public providerQuotation = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/provider-quotations${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/provider-quotations/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/provider-quotations`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/provider-quotations/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/provider-quotations/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for CmsPage entity
   */
  public cmsPage = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/cms-pages${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/cms-pages/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/cms-pages`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/cms-pages/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/cms-pages/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for BlogPost entity
   */
  public blogPost = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/blog-posts${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/blog-posts/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/blog-posts`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/blog-posts/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/blog-posts/${id}`, { method: 'DELETE' });
    },
  };

  /**
   * @author arefin
   * @description API operations for AuditLog entity
   */
  public auditLog = {
    list: async (params?: Record<string, string>): Promise<unknown> => {
      const query = params ? '?' + new URLSearchParams(params).toString() : '';
      return this.request(`/api/v1/audit-logs${query}`, { method: 'GET' });
    },
    get: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/audit-logs/${id}`, { method: 'GET' });
    },
    create: async (data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/audit-logs`, { method: 'POST', body: JSON.stringify(data) });
    },
    update: async (id: string, data: unknown): Promise<unknown> => {
      return this.request(`/api/v1/audit-logs/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
    },
    delete: async (id: string): Promise<unknown> => {
      return this.request(`/api/v1/audit-logs/${id}`, { method: 'DELETE' });
    },
  };

}
