import { createSignal, createMemo, For } from 'solid-js';
import type { HotelProperty } from '../../hotels.model';
import { getDynamicHotelCities, getDynamicHotelTypes } from '../../../../shared/data/dynamic-options';

interface HotelSearchProps {
  initialHotels: HotelProperty[];
  currentType?: string;
  currentCity?: string;
}

export default function HotelSearch(props: HotelSearchProps) {
  const [query, setQuery] = createSignal('');
  const [selectedType, setSelectedType] = createSignal(props.currentType || 'all');
  const [selectedCity, setSelectedCity] = createSignal(props.currentCity || 'all');
  const [maxPrice, setMaxPrice] = createSignal(1000);
  const [sortBy, setSortBy] = createSignal('recommended');
  const [onlyFreeCancel, setOnlyFreeCancel] = createSignal(false);

  const types = createMemo(() => [
    { label: 'All Stays', slug: 'all', href: '/hotels' },
    ...getDynamicHotelTypes(props.initialHotels).map(t => ({
      label: t.label,
      slug: t.value,
      href: `/hotels/type/${t.value}`
    }))
  ]);

  const cities = createMemo(() => getDynamicHotelCities(props.initialHotels));

  const filteredHotels = createMemo(() => {
    const list = props.initialHotels.filter((hotel) => {
      const q = query().toLowerCase().trim();
      const matchesQuery = !q ||
        hotel.name.toLowerCase().includes(q) ||
        hotel.city.toLowerCase().includes(q) ||
        hotel.country.toLowerCase().includes(q) ||
        hotel.description.toLowerCase().includes(q);

      const typeSlug = hotel.propertyType.toLowerCase().replace(/\s+/g, '-');
      const matchesType = selectedType() === 'all' || typeSlug === selectedType().toLowerCase();

      const citySlug = hotel.city.toLowerCase().replace(/\s+/g, '-');
      const matchesCity = selectedCity() === 'all' || citySlug === selectedCity().toLowerCase();

      const matchesPrice = hotel.pricePerNight <= maxPrice();
      const matchesCancel = !onlyFreeCancel() || hotel.freeCancellation;

      return matchesQuery && matchesType && matchesCity && matchesPrice && matchesCancel;
    });

    return list.sort((a, b) => {
      if (sortBy() === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy() === 'price-desc') return b.pricePerNight - a.pricePerNight;
      if (sortBy() === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // 'recommended'
    });
  });

  return (
    <div class="hotel-interactive-container">
      {/* Category Types Segmented Bar */}
      <div class="filter-matrix-box">
        <div class="category-pills-row">
          <For each={types()}>
            {(t) => (
              <a
                href={t.href}
                class={`filter-pill ${selectedType().toLowerCase() === t.slug ? 'active' : ''}`}
                onClick={(e) => {
                  if (window.location.pathname === '/hotels') {
                    e.preventDefault();
                    setSelectedType(t.slug);
                  }
                }}
              >
                {t.label}
              </a>
            )}
          </For>
        </div>

        <div class="filter-inputs-grid">
          {/* Keyword Search with Icon */}
          <div class="input-wrap">
            <label for="hotel-search-input">Search Sanctuary or Region</label>
            <div class="shadcn-input-wrap">
              <span class="input-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                id="hotel-search-input"
                class="shadcn-input"
                type="search"
                placeholder="e.g. Zermatt, Gion, Sreemangal..."
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
              />
            </div>
          </div>

          {/* City / Valley Dropdown (Shadcn Style) */}
          <div class="input-wrap">
            <label for="hotel-city-select">Destination City</label>
            <select
              id="hotel-city-select"
              class="shadcn-select"
              value={selectedCity()}
              onChange={(e) => setSelectedCity(e.currentTarget.value)}
            >
              <option value="all">All Destinations</option>
              <For each={cities()}>
                {(c) => <option value={c.value}>{c.label}</option>}
              </For>
            </select>
          </div>

          {/* Sort By Dropdown (Shadcn Style) */}
          <div class="input-wrap">
            <label for="hotel-sort-select">Sort By</label>
            <select
              id="hotel-sort-select"
              class="shadcn-select"
              value={sortBy()}
              onChange={(e) => setSortBy(e.currentTarget.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Guest Rating</option>
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div class="input-wrap">
            <label for="hotel-max-price">
              <span>Max Nightly Rate</span>
              <span class="val-indicator">${maxPrice()} / night</span>
            </label>
            <input
              id="hotel-max-price"
              class="shadcn-slider"
              type="range"
              min="150"
              max="1000"
              step="50"
              value={maxPrice()}
              onInput={(e) => setMaxPrice(Number(e.currentTarget.value))}
            />
          </div>

          {/* Free Cancellation Toggle Switch */}
          <div class="input-wrap">
            <label>Policy</label>
            <div
              class="shadcn-switch-wrap"
              onClick={() => setOnlyFreeCancel(!onlyFreeCancel())}
              role="switch"
              aria-checked={onlyFreeCancel()}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setOnlyFreeCancel(!onlyFreeCancel());
                }
              }}
            >
              <div class={`shadcn-switch-track ${onlyFreeCancel() ? 'active' : ''}`}>
                <div class="shadcn-switch-thumb"></div>
              </div>
              <span class="shadcn-switch-label">Free Cancel Only</span>
            </div>
          </div>
        </div>
      </div>

      <div class="results-header-meta">
        <span class="results-count-text">
          Showing <strong>{filteredHotels().length}</strong> of {props.initialHotels.length} boutique sanctuaries
        </span>
      </div>

      {/* Grid of Results */}
      <div class="hotels-grid">
        <For each={filteredHotels()} fallback={
          <div class="empty-state-box">
            <h3>No matching sanctuaries found</h3>
            <p>Try adjusting your price filter or selecting "All Stays".</p>
            <button
              class="btn btn-secondary btn-sm"
              onClick={() => {
                setQuery('');
                setSelectedType('all');
                setSelectedCity('all');
                setSortBy('recommended');
                setMaxPrice(1000);
                setOnlyFreeCancel(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        }>
          {(hotel) => (
            <article class="hotel-card">
              <div class="card-media">
                <img 
                  src={hotel.featuredImage} 
                  alt={hotel.name}
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div class="media-overlay">
                  <span class="badge badge-neutral">{hotel.propertyType}</span>
                  {hotel.freeCancellation && (
                    <span class="badge badge-success">Free Cancellation</span>
                  )}
                </div>
              </div>

              <div class="card-body">
                <div class="meta-row">
                  <div class="location-stars">
                    <span class="location-name">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {hotel.city}, {hotel.country}
                    </span>
                    <span class="star-rating">{'★'.repeat(hotel.starRating)}</span>
                  </div>
                  <div class="rating-box">
                    <span>{hotel.rating}</span>
                  </div>
                </div>

                <h3 class="card-title">
                  <a href={`/hotels/${hotel.slug}`}>{hotel.name}</a>
                </h3>

                <p class="card-address">{hotel.address}</p>

                <div class="amenities-pills">
                  <For each={hotel.amenities.slice(0, 3)}>
                    {(amenity) => (
                      <span class="amenity-pill">{amenity}</span>
                    )}
                  </For>
                </div>

                <div class="card-footer">
                  <div class="price-block">
                    <span class="night-label">Direct From</span>
                    <div class="price-val">
                      <span class="currency">$</span>
                      <span class="num">{hotel.pricePerNight}</span>
                      <span class="per-day">/ night</span>
                    </div>
                  </div>

                  <a href={`/hotels/${hotel.slug}`} class="btn btn-primary btn-sm">
                    View Sanctuary
                  </a>
                </div>
              </div>
            </article>
          )}
        </For>
      </div>
    </div>
  );
}
