import { createSignal, createMemo, For } from 'solid-js';
import type { VehicleItem } from '../../vehicles.model';

interface VehicleSearchProps {
  initialVehicles: VehicleItem[];
  currentCategory?: string;
}

export default function VehicleSearch(props: VehicleSearchProps) {
  const [query, setQuery] = createSignal('');
  const [selectedCategory, setSelectedCategory] = createSignal(props.currentCategory || 'all');
  const [transmission, setTransmission] = createSignal('all');
  const [sortBy, setSortBy] = createSignal('recommended');
  const [onlyChauffeur, setOnlyChauffeur] = createSignal(false);
  const [maxRate, setMaxRate] = createSignal(600);

  const categories = [
    { label: 'All Fleet', slug: 'all', href: '/vehicles' },
    { label: 'Luxury SUVs', slug: 'luxury-suv', href: '/vehicles/category/luxury-suv' },
    { label: 'Electric Sedans', slug: 'electric-sedan', href: '/vehicles/category/electric-sedan' },
    { label: 'Executive Vans', slug: 'executive-van', href: '/vehicles/category/executive-van' },
  ];

  const filteredVehicles = createMemo(() => {
    const list = props.initialVehicles.filter((vehicle) => {
      const q = query().toLowerCase().trim();
      const matchesQuery = !q ||
        vehicle.make.toLowerCase().includes(q) ||
        vehicle.model.toLowerCase().includes(q) ||
        vehicle.cityLocation.toLowerCase().includes(q);

      const catSlug = vehicle.category.toLowerCase().replace(/\s+/g, '-');
      const matchesCat = selectedCategory() === 'all' || catSlug === selectedCategory().toLowerCase();

      const matchesTrans = transmission() === 'all' || vehicle.transmission.toLowerCase() === transmission().toLowerCase();
      const matchesChauffeur = !onlyChauffeur() || vehicle.chauffeurAvailable;
      const matchesRate = vehicle.dailyRate <= maxRate();

      return matchesQuery && matchesCat && matchesTrans && matchesChauffeur && matchesRate;
    });

    // Apply Sorting
    return list.sort((a, b) => {
      if (sortBy() === 'price-asc') return a.dailyRate - b.dailyRate;
      if (sortBy() === 'price-desc') return b.dailyRate - a.dailyRate;
      if (sortBy() === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // 'recommended' preserves original order
    });
  });

  return (
    <div class="vehicle-interactive-container">
      {/* Search & Filter Matrix */}
      <div class="filter-matrix-box">
        {/* Category Segmented Pills */}
        <div class="category-pills-row">
          <For each={categories}>
            {(c) => (
              <a
                href={c.href}
                class={`filter-pill ${selectedCategory().toLowerCase() === c.slug ? 'active' : ''}`}
                onClick={(e) => {
                  if (window.location.pathname === '/vehicles') {
                    e.preventDefault();
                    setSelectedCategory(c.slug);
                  }
                }}
              >
                {c.label}
              </a>
            )}
          </For>
        </div>

        {/* Inputs & Dropdowns Grid */}
        <div class="filter-inputs-grid">
          {/* Keyword Search */}
          <div class="input-wrap">
            <label for="veh-query-input">Search Make, Model, Hub</label>
            <div class="shadcn-input-wrap">
              <span class="input-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                id="veh-query-input"
                class="shadcn-input"
                type="search"
                placeholder="e.g. Range Rover, Taycan, Zurich..."
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
              />
            </div>
          </div>

          {/* Transmission Dropdown (Shadcn Style) */}
          <div class="input-wrap">
            <label for="veh-trans-select">Transmission</label>
            <select
              id="veh-trans-select"
              class="shadcn-select"
              value={transmission()}
              onChange={(e) => setTransmission(e.currentTarget.value)}
            >
              <option value="all">All Transmissions</option>
              <option value="Automatic">Automatic Only</option>
              <option value="Manual">Manual Only</option>
            </select>
          </div>

          {/* Sort By Dropdown (Shadcn Style) */}
          <div class="input-wrap">
            <label for="veh-sort-select">Sort By</label>
            <select
              id="veh-sort-select"
              class="shadcn-select"
              value={sortBy()}
              onChange={(e) => setSortBy(e.currentTarget.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>

          {/* Max Rate Range Slider */}
          <div class="input-wrap">
            <label for="veh-max-rate">
              <span>Max Daily Rate</span>
              <span class="val-indicator">${maxRate()} / day</span>
            </label>
            <input
              id="veh-max-rate"
              class="shadcn-slider"
              type="range"
              min="200"
              max="600"
              step="20"
              value={maxRate()}
              onInput={(e) => setMaxRate(Number(e.currentTarget.value))}
            />
          </div>

          {/* Chauffeur Option Pill Switch (Shadcn Style) */}
          <div class="input-wrap">
            <label>Service Tier</label>
            <div
              class="shadcn-switch-wrap"
              onClick={() => setOnlyChauffeur(!onlyChauffeur())}
              role="switch"
              aria-checked={onlyChauffeur()}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setOnlyChauffeur(!onlyChauffeur());
                }
              }}
            >
              <div class={`shadcn-switch-track ${onlyChauffeur() ? 'active' : ''}`}>
                <div class="shadcn-switch-thumb"></div>
              </div>
              <span class="shadcn-switch-label">Chauffeur Only</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div class="results-header-meta">
        <span class="results-count-text">
          Showing <strong>{filteredVehicles().length}</strong> of {props.initialVehicles.length} executive fleet models
        </span>
      </div>

      {/* Grid of Results */}
      <div class="fleet-grid">
        <For each={filteredVehicles()} fallback={
          <div class="empty-state-box">
            <h3>No matching vehicles in fleet</h3>
            <p>Try clearing your keyword filters or adjusting your daily rate range.</p>
            <button
              class="btn btn-secondary btn-sm"
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
                setTransmission('all');
                setSortBy('recommended');
                setOnlyChauffeur(false);
                setMaxRate(600);
              }}
            >
              Reset All Filters
            </button>
          </div>
        }>
          {(vehicle) => (
            <article class="vehicle-card">
              <div class="card-media">
                <img
                  src={vehicle.featuredImage}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div class="media-overlay">
                  <span class="badge badge-neutral acriss-badge">{vehicle.acrissCode}</span>
                  {vehicle.chauffeurAvailable && (
                    <span class="badge badge-accent chauffeur-badge">Chauffeur Option</span>
                  )}
                </div>
              </div>

              <div class="card-body">
                <div class="meta-row">
                  <span class="category-name">{vehicle.category}</span>
                  <span class="location-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {vehicle.cityLocation}
                  </span>
                </div>

                <h3 class="card-title">
                  <a href={`/vehicles/${vehicle.slug}`}>{vehicle.make} {vehicle.model}</a>
                </h3>

                <div class="specs-grid">
                  <div class="spec-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                    </svg>
                    <span>{vehicle.seats} Seats</span>
                  </div>
                  <div class="spec-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <span>{vehicle.luggageCount} Bags</span>
                  </div>
                  <div class="spec-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{vehicle.transmission}</span>
                  </div>
                  <div class="spec-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="2" x2="12" y2="6"></line>
                      <line x1="12" y1="18" x2="12" y2="22"></line>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                      <line x1="2" y1="12" x2="6" y2="12"></line>
                      <line x1="18" y1="12" x2="22" y2="12"></line>
                    </svg>
                    <span>{vehicle.fuelType}</span>
                  </div>
                </div>

                <div class="protection-note">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  <span>Includes {vehicle.protectionTierIncluded}</span>
                </div>

                <div class="card-footer">
                  <div class="price-block">
                    <span class="day-label">Daily Rate</span>
                    <div class="price-val">
                      <span class="currency">$</span>
                      <span class="num">{vehicle.dailyRate}</span>
                      <span class="per-day">/ day</span>
                    </div>
                  </div>

                  <a href={`/vehicles/${vehicle.slug}`} class="btn btn-primary btn-sm">
                    Reserve Fleet
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
