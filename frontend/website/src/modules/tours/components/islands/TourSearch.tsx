import { createSignal, createMemo, For } from 'solid-js';
import type { TourPackage } from '../../tours.model';

interface TourSearchProps {
  initialTours: TourPackage[];
  currentCategory?: string;
  currentDestination?: string;
}

export default function TourSearch(props: TourSearchProps) {
  const [query, setQuery] = createSignal('');
  const [selectedCategory, setSelectedCategory] = createSignal(props.currentCategory || 'all');
  const [maxPrice, setMaxPrice] = createSignal(5000);
  const [difficulty, setDifficulty] = createSignal('all');
  const [sortBy, setSortBy] = createSignal('recommended');

  const categories = [
    { label: 'All Expeditions', slug: 'all', href: '/tours' },
    { label: 'High Altitude & Adventure', slug: 'adventure', href: '/tours/category/adventure' },
    { label: 'Cultural Heritage', slug: 'cultural', href: '/tours/category/cultural' },
    { label: 'Wildlife & Nature', slug: 'wildlife', href: '/tours/category/wildlife' },
  ];

  const filteredTours = createMemo(() => {
    const list = props.initialTours.filter((tour) => {
      const q = query().toLowerCase().trim();
      const matchesQuery = !q || 
        tour.title.toLowerCase().includes(q) || 
        tour.destination.toLowerCase().includes(q) ||
        tour.country.toLowerCase().includes(q) ||
        tour.description.toLowerCase().includes(q);

      const matchesCat = selectedCategory() === 'all' || 
        tour.category.toLowerCase() === selectedCategory().toLowerCase();

      const matchesPrice = tour.priceFrom <= maxPrice();

      const matchesDiff = difficulty() === 'all' || 
        tour.difficulty.toLowerCase() === difficulty().toLowerCase();

      return matchesQuery && matchesCat && matchesPrice && matchesDiff;
    });

    return list.sort((a, b) => {
      if (sortBy() === 'price-asc') return a.priceFrom - b.priceFrom;
      if (sortBy() === 'price-desc') return b.priceFrom - a.priceFrom;
      if (sortBy() === 'duration') return b.durationDays - a.durationDays;
      return 0; // 'recommended'
    });
  });

  return (
    <div class="tour-interactive-container">
      {/* Search & Filter Control Bar */}
      <div class="filter-matrix-box">
        <div class="category-pills-row">
          <For each={categories}>
            {(cat) => (
              <a
                href={cat.href}
                class={`filter-pill ${selectedCategory().toLowerCase() === cat.slug ? 'active' : ''}`}
                onClick={(e) => {
                  if (window.location.pathname === '/tours') {
                    e.preventDefault();
                    setSelectedCategory(cat.slug);
                  }
                }}
              >
                {cat.label}
              </a>
            )}
          </For>
        </div>

        <div class="filter-inputs-grid">
          {/* Keyword Search with Icon */}
          <div class="input-wrap">
            <label for="tour-search-query">Search Keywords</label>
            <div class="shadcn-input-wrap">
              <span class="input-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                id="tour-search-query"
                class="shadcn-input"
                type="search"
                placeholder="Search peaks, tea valleys, onsen..."
                value={query()}
                onInput={(e) => setQuery(e.currentTarget.value)}
              />
            </div>
          </div>

          {/* Difficulty Dropdown (Shadcn Style) */}
          <div class="input-wrap">
            <label for="tour-diff-select">Difficulty</label>
            <select
              id="tour-diff-select"
              class="shadcn-select"
              value={difficulty()}
              onChange={(e) => setDifficulty(e.currentTarget.value)}
            >
              <option value="all">Any Terrain</option>
              <option value="easy">Easy (Cultural / Leisure)</option>
              <option value="moderate">Moderate (Day Trekking)</option>
              <option value="challenging">Challenging (Alpine Routes)</option>
            </select>
          </div>

          {/* Sort By Dropdown (Shadcn Style) */}
          <div class="input-wrap">
            <label for="tour-sort-select">Sort By</label>
            <select
              id="tour-sort-select"
              class="shadcn-select"
              value={sortBy()}
              onChange={(e) => setSortBy(e.currentTarget.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Longest Duration</option>
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div class="input-wrap">
            <label for="tour-price-range">
              <span>Max Price</span>
              <span class="val-indicator">${maxPrice().toLocaleString()}</span>
            </label>
            <input
              id="tour-price-range"
              class="shadcn-slider"
              type="range"
              min="500"
              max="5000"
              step="100"
              value={maxPrice()}
              onInput={(e) => setMaxPrice(Number(e.currentTarget.value))}
            />
          </div>
        </div>
      </div>

      <div class="results-header-meta">
        <span class="results-count-text">
          Showing <strong>{filteredTours().length}</strong> of {props.initialTours.length} vetted expeditions
        </span>
      </div>

      {/* Grid of Results */}
      <div class="tours-grid">
        <For each={filteredTours()} fallback={
          <div class="empty-state-box">
            <h3>No matching expeditions found</h3>
            <p>Try expanding your price range or clearing keyword search filters.</p>
            <button
              class="btn btn-secondary btn-sm"
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
                setDifficulty('all');
                setSortBy('recommended');
                setMaxPrice(5000);
              }}
            >
              Reset Filters
            </button>
          </div>
        }>
          {(tour) => (
            <article class="tour-card">
              <div class="card-media">
                <img 
                  src={tour.featuredImage} 
                  alt={tour.title}
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div class="media-overlay">
                  <span class="badge badge-neutral">{tour.category}</span>
                  <span class="badge badge-accent">Verified Guide</span>
                </div>
              </div>

              <div class="card-body">
                <div class="meta-row">
                  <span class="destination-label">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {tour.destination}, {tour.country}
                  </span>
                  <span class="diff-badge">{tour.difficulty}</span>
                </div>

                <h3 class="card-title">
                  <a href={`/tours/${tour.slug}`}>{tour.title}</a>
                </h3>

                <div class="specs-grid">
                  <div class="spec-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>{tour.durationDays} Days</span>
                  </div>
                  <div class="spec-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                    </svg>
                    <span>Max {tour.groupSizeMax} pax</span>
                  </div>
                </div>

                <div class="card-footer">
                  <div class="price-block">
                    <span class="day-label">Direct Operator</span>
                    <div class="price-val">
                      <span class="currency">$</span>
                      <span class="num">{tour.priceFrom.toLocaleString()}</span>
                      <span class="per-day">/ pp</span>
                    </div>
                  </div>

                  <a href={`/tours/${tour.slug}`} class="btn btn-primary btn-sm">
                    View Journey
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
