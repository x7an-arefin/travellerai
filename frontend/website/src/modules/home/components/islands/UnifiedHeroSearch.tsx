import { createSignal, For } from 'solid-js';
import {
  getDynamicTourDestinations,
  getDynamicTourCategories,
  getDynamicHotelCities,
  getDynamicHotelTypes,
  getDynamicVehicleCategories,
  getDynamicVehicleHubs
} from '../../../../shared/data/dynamic-options';

export default function UnifiedHeroSearch() {
  const [activeTab, setActiveTab] = createSignal<'tours' | 'hotels' | 'vehicles'>('tours');
  const [tourCategory, setTourCategory] = createSignal('all');
  const [tourDestination, setTourDestination] = createSignal('all');
  const [hotelType, setHotelType] = createSignal('all');
  const [hotelCity, setHotelCity] = createSignal('all');
  const [vehicleCategory, setVehicleCategory] = createSignal('all');

  const tourDestinations = getDynamicTourDestinations();
  const tourCategories = getDynamicTourCategories();
  const hotelCities = getDynamicHotelCities();
  const hotelTypes = getDynamicHotelTypes();
  const vehicleCategories = getDynamicVehicleCategories();
  const vehicleHubs = getDynamicVehicleHubs();

  const handleTourSubmit = (e: Event) => {
    e.preventDefault();
    if (tourDestination() !== 'all') {
      window.location.href = `/tours/destination/${tourDestination()}`;
    } else if (tourCategory() !== 'all') {
      window.location.href = `/tours/category/${tourCategory()}`;
    } else {
      window.location.href = '/tours';
    }
  };

  const handleHotelSubmit = (e: Event) => {
    e.preventDefault();
    if (hotelCity() !== 'all') {
      window.location.href = `/hotels/city/${hotelCity()}`;
    } else if (hotelType() !== 'all') {
      window.location.href = `/hotels/type/${hotelType()}`;
    } else {
      window.location.href = '/hotels';
    }
  };

  const handleVehicleSubmit = (e: Event) => {
    e.preventDefault();
    if (vehicleCategory() !== 'all') {
      window.location.href = `/vehicles/category/${vehicleCategory()}`;
    } else {
      window.location.href = '/vehicles';
    }
  };

  return (
    <div class="search-matrix-card">
      <div class="matrix-tabs" role="tablist" aria-label="Search Categories">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab() === 'tours'}
          class={`matrix-tab ${activeTab() === 'tours' ? 'active' : ''}`}
          onClick={() => setActiveTab('tours')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
          Tours & Expeditions
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab() === 'hotels'}
          class={`matrix-tab ${activeTab() === 'hotels' ? 'active' : ''}`}
          onClick={() => setActiveTab('hotels')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Hotels & Chalets
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab() === 'vehicles'}
          class={`matrix-tab ${activeTab() === 'vehicles' ? 'active' : ''}`}
          onClick={() => setActiveTab('vehicles')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          Executive Fleet
        </button>
      </div>

      {activeTab() === 'tours' && (
        <form onSubmit={handleTourSubmit} class="search-form-row">
          <div class="search-input-group">
            <label for="tour-dest-select">Destination</label>
            <select
              id="tour-dest-select"
              class="shadcn-select"
              value={tourDestination()}
              onChange={(e) => setTourDestination(e.currentTarget.value)}
            >
              <option value="all">All Global Regions</option>
              <For each={tourDestinations}>
                {(d) => <option value={d.value}>{d.label}</option>}
              </For>
            </select>
          </div>

          <div class="search-input-group">
            <label for="tour-cat-select">Expedition Style</label>
            <select
              id="tour-cat-select"
              class="shadcn-select"
              value={tourCategory()}
              onChange={(e) => setTourCategory(e.currentTarget.value)}
            >
              <option value="all">All Categories</option>
              <For each={tourCategories}>
                {(c) => <option value={c.value}>{c.label}</option>}
              </For>
            </select>
          </div>

          <div class="search-input-group">
            <label for="tour-guests-select">Travelers</label>
            <select id="tour-guests-select" class="shadcn-select">
              <option value="2">2 Adults (Private Pair)</option>
              <option value="1">Solo Traveler</option>
              <option value="4">Small Group (Up to 6)</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary search-submit-btn">
            Explore Expeditions
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
      )}

      {activeTab() === 'hotels' && (
        <form onSubmit={handleHotelSubmit} class="search-form-row">
          <div class="search-input-group">
            <label for="hotel-city-select">City / Valley</label>
            <select
              id="hotel-city-select"
              class="shadcn-select"
              value={hotelCity()}
              onChange={(e) => setHotelCity(e.currentTarget.value)}
            >
              <option value="all">All Destinations</option>
              <For each={hotelCities}>
                {(c) => <option value={c.value}>{c.label}</option>}
              </For>
            </select>
          </div>

          <div class="search-input-group">
            <label for="hotel-type-select">Property Type</label>
            <select
              id="hotel-type-select"
              class="shadcn-select"
              value={hotelType()}
              onChange={(e) => setHotelType(e.currentTarget.value)}
            >
              <option value="all">All Architectural Types</option>
              <For each={hotelTypes}>
                {(t) => <option value={t.value}>{t.label}</option>}
              </For>
            </select>
          </div>

          <div class="search-input-group">
            <label for="hotel-room-select">Rooms & Guests</label>
            <select id="hotel-room-select" class="shadcn-select">
              <option value="1-2">1 Room, 2 Guests</option>
              <option value="1-1">1 Room, 1 Guest</option>
              <option value="2-4">2 Rooms, 4 Guests</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary search-submit-btn">
            Search Sanctuaries
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
      )}

      {activeTab() === 'vehicles' && (
        <form onSubmit={handleVehicleSubmit} class="search-form-row">
          <div class="search-input-group">
            <label for="vehicle-cat-select">Fleet Class</label>
            <select
              id="vehicle-cat-select"
              class="shadcn-select"
              value={vehicleCategory()}
              onChange={(e) => setVehicleCategory(e.currentTarget.value)}
            >
              <option value="all">All Fleet Classes</option>
              <For each={vehicleCategories}>
                {(c) => <option value={c.value}>{c.label}</option>}
              </For>
            </select>
          </div>

          <div class="search-input-group">
            <label for="vehicle-service-select">Service Model</label>
            <select id="vehicle-service-select" class="shadcn-select">
              <option value="self">Self-Drive VIP</option>
              <option value="chauffeur">Chauffeured Direct Transfer</option>
            </select>
          </div>

          <div class="search-input-group">
            <label for="vehicle-hub-select">Station Hub</label>
            <select id="vehicle-hub-select" class="shadcn-select">
              <option value="all">All Fleet Hubs</option>
              <For each={vehicleHubs}>
                {(h) => <option value={h.value}>{h.label}</option>}
              </For>
            </select>
          </div>

          <button type="submit" class="btn btn-primary search-submit-btn">
            Reserve Fleet
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
