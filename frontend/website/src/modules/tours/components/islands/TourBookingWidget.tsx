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
        <p class="guarantee-note">✓ Best Rate & Financial Operator Guarantee</p>
      </div>

      <form onSubmit={handleReserve} class="booking-widget-form">
        <div class="form-field">
          <label for="dep-date-input">Select Departure Date</label>
          <input
            id="dep-date-input"
            type="date"
            value={departureDate()}
            onInput={(e) => setDepartureDate(e.currentTarget.value)}
            required
          />
        </div>

        <div class="form-field">
          <label for="travelers-select">Number of Travelers</label>
          <select
            id="travelers-select"
            value={travelers()}
            onChange={(e) => setTravelers(Number(e.currentTarget.value))}
          >
            <option value="1">1 Adult (Solo)</option>
            <option value="2">2 Adults (Standard Double)</option>
            <option value="3">3 Adults</option>
            <option value="4">4 Adults (Private Group)</option>
            <option value="6">6 Adults (Custom)</option>
          </select>
        </div>

        {/* Optional Addons */}
        <div class="addons-container">
          <span class="addons-title">Recommended Add-Ons:</span>
          <label class="addon-checkbox">
            <input
              type="checkbox"
              checked={selectedAddons().includes('private-transit')}
              onChange={() => toggleAddon('private-transit')}
            />
            <span>Luggage VIP Transit (+$150/pp)</span>
          </label>
          <label class="addon-checkbox">
            <input
              type="checkbox"
              checked={selectedAddons().includes('gourmet-pairings')}
              onChange={() => toggleAddon('gourmet-pairings')}
            />
            <span>Sommelier Wine Pairing (+$150/pp)</span>
          </label>
        </div>

        {/* Price Breakdown Summary */}
        <div class="price-breakdown">
          <div class="row">
            <span>{props.tour.priceFrom.toLocaleString()} × {travelers()} Travelers</span>
            <span>${baseTotal().toLocaleString()}</span>
          </div>
          {addonTotal() > 0 && (
            <div class="row">
              <span>Selected Add-ons</span>
              <span>+${addonTotal().toLocaleString()}</span>
            </div>
          )}
          <div class="row total-row">
            <strong>Estimated Total:</strong>
            <strong>${grandTotal().toLocaleString()} USD</strong>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-block"
          disabled={isProcessing()}
        >
          {isProcessing() ? 'Securing Departure...' : 'Reserve Departure'}
        </button>

        <p class="terms-micro">
          🔒 Zero payment charged today. Free cancellation up to 30 days prior.
        </p>
      </form>

      <div class="provider-trust-box">
        <span class="pt-label">Operated directly by:</span>
        <span class="pt-name">{props.tour.providerName}</span>
        <span class="pt-status">✓ Fully Insured & Licensed Operator</span>
      </div>
    </div>
  );
}
