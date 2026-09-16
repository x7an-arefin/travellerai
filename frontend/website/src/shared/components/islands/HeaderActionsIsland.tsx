import { createSignal, onMount, For, Show } from 'solid-js';
import { useStore } from '@nanostores/solid';
import { $cart, $favorites, $currency, removeFromCart } from '../../../modules/cart/cart.store';

export default function HeaderActionsIsland() {
  const cartItems = useStore($cart);
  const favoriteItems = useStore($favorites);
  const currentCurrency = useStore($currency);

  const [isCartOpen, setIsCartOpen] = createSignal(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = createSignal(false);
  const [theme, setTheme] = createSignal<'light' | 'dark'>('light');

  onMount(() => {
    const savedTheme = localStorage.getItem('traveller-theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  });

  const toggleTheme = () => {
    const newTheme = theme() === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('traveller-theme', newTheme);
  };

  const handleCurrencyChange = (curr: string) => {
    $currency.set(curr);
  };

  const totalCartValue = () => {
    return cartItems().reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  };

  return (
    <div class="header-island-wrapper">
      {/* Theme Toggle Button */}
      <button
        type="button"
        class="icon-btn"
        aria-label={`Switch to ${theme() === 'light' ? 'Dark' : 'Light'} Mode`}
        title={`Switch to ${theme() === 'light' ? 'Dark' : 'Light'} Mode`}
        onClick={toggleTheme}
      >
        <Show when={theme() === 'light'} fallback={
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        }>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </Show>
      </button>

      {/* Currency Selector */}
      <div class="currency-select-wrap">
        <select
          value={currentCurrency()}
          onChange={(e) => handleCurrencyChange(e.currentTarget.value)}
          class="shadcn-select-sm"
          aria-label="Display Currency"
        >
          <option value="USD">USD ($)</option>
          <option value="CHF">CHF (Fr.)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
        </select>
      </div>

      {/* Cart Drawer Trigger */}
      <button
        type="button"
        class="icon-btn cart-trigger"
        aria-label="View Booking Cart"
        onClick={() => setIsCartOpen(!isCartOpen())}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <Show when={cartItems().length > 0}>
          <span class="cart-badge-dot">{cartItems().length}</span>
        </Show>
      </button>

      {/* Mobile Nav Hamburger Trigger */}
      <button
        type="button"
        class="icon-btn mobile-hamburger"
        aria-label="Toggle Mobile Menu"
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen())}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Slide-out Cart Drawer */}
      <Show when={isCartOpen()}>
        <div class="drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div class="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div class="drawer-header">
              <h3>Active Itinerary Cart ({cartItems().length})</h3>
              <button class="close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div class="drawer-body">
              <Show when={cartItems().length > 0} fallback={
                <div class="empty-cart-msg">
                  <p>Your itinerary cart is currently empty.</p>
                  <a href="/tours" class="btn btn-primary btn-sm" onClick={() => setIsCartOpen(false)}>
                    Browse Expeditions
                  </a>
                </div>
              }>
                <div class="cart-items-stack">
                  <For each={cartItems()}>
                    {(item) => (
                      <div class="cart-item-row">
                        <img src={item.image} alt={item.title} class="item-thumb" />
                        <div class="item-info">
                          <span class="item-type">{item.type.toUpperCase()}</span>
                          <h4 class="item-title">{item.title}</h4>
                          <span class="item-sub">{item.subtitle}</span>
                          <div class="item-price-row">
                            <span>${item.unitPrice * item.quantity} {item.currency}</span>
                            <button
                              class="remove-item-btn"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </Show>
            </div>

            <Show when={cartItems().length > 0}>
              <div class="drawer-footer">
                <div class="total-row">
                  <span>Estimated Total:</span>
                  <strong>${totalCartValue().toLocaleString()} {currentCurrency()}</strong>
                </div>
                <a
                  href={cartItems()[0]?.type === 'hotel' ? '/checkout/hotel' : cartItems()[0]?.type === 'vehicle' ? '/checkout/vehicle' : '/checkout/tour'}
                  class="btn btn-primary btn-block"
                  onClick={() => setIsCartOpen(false)}
                >
                  Proceed to Escrow Checkout →
                </a>
              </div>
            </Show>
          </div>
        </div>
      </Show>

      {/* Mobile Slide-out Menu Drawer */}
      <Show when={isMobileNavOpen()}>
        <div class="drawer-overlay" onClick={() => setIsMobileNavOpen(false)}>
          <div class="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div class="drawer-header">
              <span class="logo-mark">TRAVELLER<strong>AI</strong></span>
              <button class="close-btn" onClick={() => setIsMobileNavOpen(false)}>✕</button>
            </div>

            <nav class="mobile-links-list">
              <a href="/destinations" class="mob-link" onClick={() => setIsMobileNavOpen(false)}>Destinations</a>
              <a href="/tours" class="mob-link" onClick={() => setIsMobileNavOpen(false)}>Curated Expeditions</a>
              <a href="/hotels" class="mob-link" onClick={() => setIsMobileNavOpen(false)}>Hotels & Chalets</a>
              <a href="/vehicles" class="mob-link" onClick={() => setIsMobileNavOpen(false)}>Executive Fleet</a>
              <a href="/vehicles/transfers" class="mob-link" onClick={() => setIsMobileNavOpen(false)}>VIP Transfers</a>
              <a href="/providers" class="mob-link" onClick={() => setIsMobileNavOpen(false)}>Verified Operators</a>
              <a href="/blog" class="mob-link" onClick={() => setIsMobileNavOpen(false)}>The Dispatch</a>
              <a href="/provider" class="mob-link" onClick={() => setIsMobileNavOpen(false)}>For Travel Providers</a>
              <a href="/help" class="mob-link" onClick={() => setIsMobileNavOpen(false)}>Help Center</a>
            </nav>

            <div class="mobile-drawer-footer">
              <a href="/account" class="btn btn-secondary btn-block" onClick={() => setIsMobileNavOpen(false)}>
                Traveler Account
              </a>
              <a href="/auth/login" class="btn btn-primary btn-block" onClick={() => setIsMobileNavOpen(false)}>
                Sign In / Register
              </a>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
