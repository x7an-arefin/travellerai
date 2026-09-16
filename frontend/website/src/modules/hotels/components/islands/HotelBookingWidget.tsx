import { createSignal } from 'solid-js';
import type { HotelProperty } from '../../hotels.model';
import { addToCart } from '../../../cart/cart.store';

interface HotelBookingWidgetProps {
  hotel: HotelProperty;
}

export default function HotelBookingWidget(props: HotelBookingWidgetProps) {
  const [nights, setNights] = createSignal(2);
  const [guests, setGuests] = createSignal(2);
  const [ratePlan, setRatePlan] = createSignal<'flexible' | 'saver'>('flexible');
  const [isProcessing, setIsProcessing] = createSignal(false);

  const discountMultiplier = () => ratePlan() === 'saver' ? 0.9 : 1.0;
  const pricePerNight = () => Math.round(props.hotel.pricePerNight * discountMultiplier());
  const totalPrice = () => pricePerNight() * nights();

  const handleBook = (e: Event) => {
    e.preventDefault();
    setIsProcessing(true);

    addToCart({
      id: `${props.hotel.id}-${Date.now()}`,
      type: 'hotel',
      title: props.hotel.name,
      subtitle: `${nights()} Nights • ${guests()} Guests • ${ratePlan() === 'flexible' ? 'Flexible' : 'Saver'}`,
      image: props.hotel.featuredImage,
      unitPrice: pricePerNight(),
      quantity: nights(),
      currency: props.hotel.currency,
      details: {
        nights: nights(),
        guests: guests(),
        ratePlan: ratePlan(),
        total: totalPrice(),
        city: props.hotel.city
      }
    });

    setTimeout(() => {
      window.location.href = '/checkout/hotel';
    }, 400);
  };

  return (
    <div class="booking-box">
      <div class="price-header">
        <span class="label">Calculated Nightly Rate</span>
        <div class="price">
          <span class="val">${pricePerNight()}</span>
          <span class="sub">/ night</span>
        </div>
      </div>

      <form onSubmit={handleBook} class="input-stack">
        {/* Stay Duration */}
        <div class="input-grp">
          <label for="hotel-nights-input">Duration of Stay</label>
          <select
            id="hotel-nights-input"
            class="shadcn-select"
            value={nights()}
            onChange={(e) => setNights(Number(e.currentTarget.value))}
          >
            <option value={2} selected={nights() === 2}>2 Nights (Weekend Sanctuary)</option>
            <option value={3} selected={nights() === 3}>3 Nights (Extended Rest)</option>
            <option value={4} selected={nights() === 4}>4 Nights (Midweek Retreat)</option>
            <option value={7} selected={nights() === 7}>7 Nights (Full Week Immersion)</option>
          </select>
        </div>

        {/* Guests and Rooms */}
        <div class="input-grp">
          <label for="hotel-guests-select">Guests & Accommodation</label>
          <select
            id="hotel-guests-select"
            class="shadcn-select"
            value={guests()}
            onChange={(e) => setGuests(Number(e.currentTarget.value))}
          >
            <option value={1} selected={guests() === 1}>1 Adult, 1 Room (Solo)</option>
            <option value={2} selected={guests() === 2}>2 Adults, 1 Room (Couple / Pair)</option>
            <option value={4} selected={guests() === 4}>4 Adults, 2 Connecting Suites</option>
          </select>
        </div>

        {/* Rate Plan Segmented Control Switch */}
        <div class="input-grp">
          <label>Rate Plan</label>
          <div class="segmented-control-group" role="radiogroup" aria-label="Rate Plan">
            <label class={`segmented-control-item ${ratePlan() === 'flexible' ? 'active' : ''}`}>
              <input
                type="radio"
                name="ratePlan"
                checked={ratePlan() === 'flexible'}
                onChange={() => setRatePlan('flexible')}
              />
              <span class="seg-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Flexible
              </span>
              <span class="seg-sub">Free Cancellation</span>
            </label>

            <label class={`segmented-control-item ${ratePlan() === 'saver' ? 'active' : ''}`}>
              <input
                type="radio"
                name="ratePlan"
                checked={ratePlan() === 'saver'}
                onChange={() => setRatePlan('saver')}
              />
              <span class="seg-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Saver
              </span>
              <span class="seg-sub">Save 10% Today</span>
            </label>
          </div>
        </div>

        {/* Price Breakdown */}
        <div class="price-breakdown">
          <div class="row">
            <span>Room Rate (${pricePerNight()} × {nights()} nights)</span>
            <span>${totalPrice().toLocaleString()}</span>
          </div>
          {ratePlan() === 'saver' && (
            <div class="row" style={{ color: 'var(--color-success)' }}>
              <span>Saver Tier Applied</span>
              <span>-10% Discount</span>
            </div>
          )}
          <div class="row total-row">
            <span>Estimated Total ({props.hotel.currency}):</span>
            <span>${totalPrice().toLocaleString()} USD</span>
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
          {isProcessing() ? 'Locking Sanctuary...' : 'Select Room & Reserve'}
        </button>

        <p class="micro-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          Instant confirmation. {ratePlan() === 'flexible' ? 'Free cancellation until 48h before check-in.' : 'Advance purchase rate.'}
        </p>
      </form>
    </div>
  );
}
