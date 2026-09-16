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
  const [onlyChauffeur, setOnlyChauffeur] = createSignal(false);
  const [maxRate, setMaxRate] = createSignal(600);

  const categories = [
    { label: 'All Fleet', slug: 'all', href: '/vehicles' },
    { label: 'Luxury SUVs', slug: 'luxury-suv', href: '/vehicles/category/luxury-suv' },
    { label: 'Electric Sedans', slug: 'electric-sedan', href: '/vehicles/category/electric-sedan' },
    { label: 'Executive Vans', slug: 'executive-van', href: '/vehicles/category/executive-van' },
  ];

  const filteredVehicles = createMemo(() => {
    return props.initialVehicles.filter((vehicle) => {
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
  });

  return (
    <div class="vehicle-interactive-container">
      {/* Category Pills */}
      <div class="filter-matrix-box">
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

        <div class="filter-inputs-grid">
          <div class="input-wrap">
            <label for="veh-query-input">Search Make, Model, Hub</label>
            <input
              id="veh-query-input"
              type="search"
              placeholder="e.g. Range Rover, Taycan, Zurich..."
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
            />
          </div>

          <div class="input-wrap">
            <label for="veh-max-rate">Max Daily Rate: ${maxRate()}</label>
            <input
              id="veh-max-rate"
              type="range"
              min="200"
              max="600"
              step="20"
              value={maxRate()}
              onInput={(e) => setMaxRate(Number(e.currentTarget.value))}
            />
          </div>

          <div class="input-wrap checkbox-wrap">
            <label class="checkbox-label">
              <input
                type="checkbox"
                checked={onlyChauffeur()}
                onChange={(e) => setOnlyChauffeur(e.currentTarget.checked)}
              />
              <span>Chauffeur Option Only</span>
            </label>
          </div>
        </div>
      </div>

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
            <p>Try clearing filters or adjusting max daily price.</p>
            <button
              class="btn btn-secondary btn-sm"
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
                setTransmission('all');
                setOnlyChauffeur(false);
                setMaxRate(600);
              }}
            >
              Reset Filters
            </button>
          </div>
        }>
          {(vehicle) => (
            <article class="vehicle-card">
              <div class="card-media">
                <img src={vehicle.featuredImage} alt={`${vehicle.make} ${vehicle.model}`} loading="lazy" width="600" height="400" />
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
                  <span class="location-tag">{vehicle.cityLocation}</span>
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
