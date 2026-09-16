import { createSignal } from 'solid-js';
import type { TourPackage } from '../../tours.model';
import { addToCart } from '../../../cart/cart.store';

interface TourBookingWidgetProps {
  tour: TourPackage;
}

export default function TourBookingWidget(props: TourBookingWidgetProps) {
  const [departureDate, setDepartureDate] = createSignal(props.tour.nextDepartureDate || '2026-10-12');
  const [travelers, setTravelers] = createSignal(2);
  const [isProcessing, setIsProcessing] = createSignal(false);
  const [selectedAddons, setSelectedAddons] = createSignal<string[]>([]);

  const baseTotal = () => props.tour.priceFrom * travelers();
  const addonTotal = () => selectedAddons().length * 150 * travelers();
  const grandTotal = () => baseTotal() + addonTotal();

  const toggleAddon = (addon: string) => {
    if (selectedAddons().includes(addon)) {
      setSelectedAddons(selectedAddons().filter(a => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons(), addon]);
    }
  };

  const handleReserve = (e: Event) => {
    e.preventDefault();
    setIsProcessing(true);

    addToCart({
      id: `${props.tour.id}-${Date.now()}`,
      type: 'tour',
      title: props.tour.title,
      subtitle: `${travelers()} Travelers • ${props.tour.durationDays} Days`,
      image: props.tour.featuredImage,
      unitPrice: props.tour.priceFrom,
      quantity: travelers(),
      currency: props.tour.currency,
      startDate: departureDate(),
      details: {
        addons: selectedAddons(),
        total: grandTotal(),
        provider: props.tour.providerName
      }
    });

    setTimeout(() => {
      window.location.href = '/checkout/tour';
    }, 400);
  };

  return (
    <div class="sticky-booking-card">
      <div class="booking-price-header">
        <span class="price-eyebrow">Direct Operator Price</span>
        <div class="price-display">
          <span class="currency">$</span>
          <span class="amount">{props.tour.priceFrom.toLocaleString()}</span>
          <span class="unit">USD / person</span>
        </div>
        <p class="guarantee-note">✓ Best Rate & Verified Financial Operator Guarantee</p>
      </div>

      <form onSubmit={handleReserve} class="booking-widget-form">
        {/* Departure Date */}
        <div class="form-field">
          <label for="dep-date-input">Select Departure Date</label>
          <input
            id="dep-date-input"
            class="shadcn-input"
            type="date"
            value={departureDate()}
            onInput={(e) => setDepartureDate(e.currentTarget.value)}
            required
          />
        </div>

        {/* Number of Travelers Dropdown */}
        <div class="form-field">
          <label for="travelers-select">Number of Travelers</label>
          <select
            id="travelers-select"
            class="shadcn-select"
            value={travelers()}
            onChange={(e) => setTravelers(Number(e.currentTarget.value))}
          >
            <option value={1} selected={travelers() === 1}>1 Adult (Solo Expedition)</option>
            <option value={2} selected={travelers() === 2}>2 Adults (Standard Double Pair)</option>
            <option value={3} selected={travelers() === 3}>3 Adults (Triple Room / Alpine Refuges)</option>
            <option value={4} selected={travelers() === 4}>4 Adults (Private Group Roster)</option>
            <option value={6} selected={travelers() === 6}>6 Adults (Full Guided Traverse)</option>
          </select>
        </div>

        {/* Optional Addons with Interactive Pill Switches */}
        <div class="addons-container">
          <span class="addons-title">Recommended Add-Ons:</span>
          
          <div
            class={`addon-pill-item ${selectedAddons().includes('private-transit') ? 'active' : ''}`}
            onClick={() => toggleAddon('private-transit')}
            role="checkbox"
            aria-checked={selectedAddons().includes('private-transit')}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleAddon('private-transit');
              }
            }}
          >
            <div class="addon-pill-left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={selectedAddons().includes('private-transit') ? 'currentColor' : 'var(--color-mist)'} stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                {selectedAddons().includes('private-transit') && (
                  <polyline points="9 11 12 14 22 4"></polyline>
                )}
              </svg>
              <span>Luggage VIP Transit</span>
            </div>
            <span class="addon-price-tag">+$150 / pp</span>
          </div>

          <div
            class={`addon-pill-item ${selectedAddons().includes('gourmet-pairings') ? 'active' : ''}`}
            onClick={() => toggleAddon('gourmet-pairings')}
            role="checkbox"
            aria-checked={selectedAddons().includes('gourmet-pairings')}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleAddon('gourmet-pairings');
              }
            }}
          >
            <div class="addon-pill-left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={selectedAddons().includes('gourmet-pairings') ? 'currentColor' : 'var(--color-mist)'} stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                {selectedAddons().includes('gourmet-pairings') && (
                  <polyline points="9 11 12 14 22 4"></polyline>
                )}
              </svg>
              <span>Sommelier Wine Pairing</span>
            </div>
            <span class="addon-price-tag">+$150 / pp</span>
          </div>
        </div>

        {/* Price Breakdown Summary */}
        <div class="price-breakdown">
          <div class="row">
            <span>Base Package (${props.tour.priceFrom} × {travelers()}p)</span>
            <span>${baseTotal().toLocaleString()}</span>
          </div>
          {selectedAddons().length > 0 && (
            <div class="row">
              <span>Selected Add-Ons ({selectedAddons().length} × {travelers()}p)</span>
              <span>+${addonTotal().toLocaleString()}</span>
            </div>
          )}
          <div class="row total-row">
            <span>Estimated Total ({props.tour.currency}):</span>
            <span>${grandTotal().toLocaleString()} USD</span>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-block"
          disabled={isProcessing()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          {isProcessing() ? 'Securing Departure...' : 'Book Guided Expedition'}
        </button>

        <p class="micro-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          Zero commission markup. Direct escrow verification with licensed guides.
        </p>
      </form>
    </div>
  );
}
