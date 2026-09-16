import { createSignal, createMemo, For } from 'solid-js';
import type { HotelProperty } from '../../hotels.model';

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
  const [onlyFreeCancel, setOnlyFreeCancel] = createSignal(false);

  const types = [
    { label: 'All Stays', slug: 'all', href: '/hotels' },
    { label: 'Alpine Chalets', slug: 'alpine-chalet', href: '/hotels/type/alpine-chalet' },
    { label: 'Heritage Ryokans', slug: 'heritage-ryokan', href: '/hotels/type/heritage-ryokan' },
    { label: 'Eco Villas', slug: 'eco-villa', href: '/hotels/type/eco-villa' },
  ];

  const filteredHotels = createMemo(() => {
    return props.initialHotels.filter((hotel) => {
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
  });

  return (
    <div class="hotel-interactive-container">
      {/* Category Types Row */}
      <div class="filter-matrix-box">
        <div class="category-pills-row">
          <For each={types}>
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
          <div class="input-wrap">
            <label for="hotel-search-input">Search Sanctuary or City</label>
            <input
              id="hotel-search-input"
              type="search"
              placeholder="e.g. Zermatt, Gion, Sreemangal..."
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
            />
          </div>

          <div class="input-wrap">
            <label for="hotel-max-price">Max Nightly Rate: ${maxPrice()}</label>
            <input
              id="hotel-max-price"
              type="range"
              min="150"
              max="1000"
              step="50"
              value={maxPrice()}
              onInput={(e) => setMaxPrice(Number(e.currentTarget.value))}
            />
          </div>

          <div class="input-wrap checkbox-wrap">
            <label class="checkbox-label">
              <input
                type="checkbox"
                checked={onlyFreeCancel()}
                onChange={(e) => setOnlyFreeCancel(e.currentTarget.checked)}
              />
              <span>Free Cancellation Only</span>
            </label>
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
                <img src={hotel.featuredImage} alt={hotel.name} loading="lazy" width="600" height="400" />
                <div class="media-overlay">
                  <span class="badge badge-neutral property-type-badge">{hotel.propertyType}</span>
                  {hotel.freeCancellation && (
                    <span class="badge badge-success cancellation-badge">Free Cancellation</span>
                  )}
                </div>
              </div>

              <div class="card-body">
                <div class="meta-row">
                  <div class="location-stars">
                    <span class="location-name">{hotel.city}, {hotel.country}</span>
                    <span class="star-rating">{'★'.repeat(hotel.starRating)}</span>
                  </div>
                  <div class="rating-box">
                    <span class="score">{hotel.rating.toFixed(1)}</span>
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
                  {hotel.amenities.length > 3 && (
                    <span class="amenity-pill more">+{hotel.amenities.length - 3} more</span>
                  )}
                </div>

                <div class="card-footer">
                  <div class="price-block">
                    <span class="night-label">Nightly Rate</span>
                    <div class="price-val">
                      <span class="currency">$</span>
                      <span class="num">{hotel.pricePerNight}</span>
                      <span class="tax-info">excl. taxes</span>
                    </div>
                  </div>

                  <a href={`/hotels/${hotel.slug}`} class="btn btn-secondary btn-sm">
                    View Rooms ({hotel.roomTypesCount})
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
