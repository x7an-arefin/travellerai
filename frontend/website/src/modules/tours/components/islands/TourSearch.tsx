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

  const categories = [
    { label: 'All Expeditions', slug: 'all', href: '/tours' },
    { label: 'High Altitude & Adventure', slug: 'adventure', href: '/tours/category/adventure' },
    { label: 'Cultural Heritage', slug: 'cultural', href: '/tours/category/cultural' },
    { label: 'Wildlife & Nature', slug: 'wildlife', href: '/tours/category/wildlife' },
  ];

  const filteredTours = createMemo(() => {
    return props.initialTours.filter((tour) => {
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
                  // If on the main tours page, filter live in-memory
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
          <div class="input-wrap">
            <label for="tour-search-query">Search Keywords</label>
            <input
              id="tour-search-query"
              type="search"
              placeholder="Search peaks, tea valleys, onsen..."
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
            />
          </div>

          <div class="input-wrap">
            <label for="tour-price-range">Max Price: ${maxPrice()}</label>
            <input
              id="tour-price-range"
              type="range"
              min="500"
              max="5000"
              step="100"
              value={maxPrice()}
              onInput={(e) => setMaxPrice(Number(e.currentTarget.value))}
            />
          </div>

          <div class="input-wrap">
            <label for="tour-diff-select">Difficulty</label>
            <select
              id="tour-diff-select"
              value={difficulty()}
              onChange={(e) => setDifficulty(e.currentTarget.value)}
            >
              <option value="all">Any Terrain</option>
              <option value="easy">Easy (Cultural/Leisure)</option>
              <option value="moderate">Moderate (Day Trekking)</option>
              <option value="challenging">Challenging (Alpine Routes)</option>
            </select>
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
                setMaxPrice(5000);
                setDifficulty('all');
              }}
            >
              Reset All Filters
            </button>
          </div>
        }>
          {(tour) => (
            <article class="tour-card">
              <div class="card-media">
                <img src={tour.featuredImage} alt={tour.title} loading="lazy" width="600" height="400" />
                <div class="media-overlay">
                  {tour.badge && <span class="badge badge-accent card-badge">{tour.badge}</span>}
                  <span class="badge badge-neutral duration-badge">{tour.durationDays}D / {tour.durationNights}N</span>
                </div>
              </div>

              <div class="card-body">
                <div class="meta-row">
                  <span class="destination-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {tour.destination}, {tour.country}
                  </span>
                  <div class="rating-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>{tour.rating.toFixed(2)}</span>
                    <span class="reviews-count">({tour.reviewsCount})</span>
                  </div>
                </div>

                <h3 class="card-title">
                  <a href={`/tours/${tour.slug}`}>{tour.title}</a>
                </h3>

                <p class="card-subtitle">{tour.subtitle}</p>

                <div class="highlights-preview">
                  <For each={tour.highlights.slice(0, 2)}>
                    {(h) => (
                      <div class="highlight-item">
                        <span class="bullet">▪</span>
                        <span>{h}</span>
                      </div>
                    )}
                  </For>
                </div>

                <div class="card-footer">
                  <div class="price-block">
                    <span class="price-from-label">From</span>
                    <div class="price-amount">
                      <span class="currency">$</span>
                      <span class="value">{tour.priceFrom.toLocaleString()}</span>
                      <span class="per-person">/ person</span>
                    </div>
                  </div>

                  <a href={`/tours/${tour.slug}`} class="btn btn-primary btn-sm">
                    Explore Itinerary
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
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
