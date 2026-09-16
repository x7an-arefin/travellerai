import { createSignal } from 'solid-js';
import type { HotelProperty } from '../../hotels.model';
import { addToCart } from '../../../cart/cart.store';

interface HotelBookingWidgetProps {
  hotel: HotelProperty;
}

export default function HotelBookingWidget(props: HotelBookingWidgetProps) {
  const [nights, setNights] = createSignal(4);
  const [guests, setGuests] = createSignal(2);
  const [ratePlan, setRatePlan] = createSignal<'flexible' | 'saver'>('flexible');
  const [isProcessing, setIsProcessing] = createSignal(false);

  const pricePerNight = () => ratePlan() === 'saver' ? Math.round(props.hotel.pricePerNight * 0.9) : props.hotel.pricePerNight;
  const totalPrice = () => pricePerNight() * nights();

  const handleBook = (e: Event) => {
    e.preventDefault();
    setIsProcessing(true);

    addToCart({
      id: `${props.hotel.id}-${Date.now()}`,
      type: 'hotel',
      title: props.hotel.name,
      subtitle: `${nights()} Nights • ${guests()} Guests (${ratePlan() === 'saver' ? 'Non-Refundable Saver' : 'Flexible Rate'})`,
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
        <span class="label">Starting Nightly Rate</span>
        <div class="price">
          <span class="val">${pricePerNight()}</span>
          <span class="sub">/ night</span>
        </div>
      </div>

      <form onSubmit={handleBook} class="input-stack">
        <div class="input-grp">
          <label for="hotel-nights-input">Duration of Stay</label>
          <select
            id="hotel-nights-input"
            value={nights()}
            onChange={(e) => setNights(Number(e.currentTarget.value))}
          >
            <option value="2">2 Nights</option>
            <option value="3">3 Nights</option>
            <option value="4">4 Nights</option>
            <option value="7">7 Nights (Week Retreat)</option>
          </select>
        </div>

        <div class="input-grp">
          <label for="hotel-guests-select">Guests & Rooms</label>
          <select
            id="hotel-guests-select"
            value={guests()}
            onChange={(e) => setGuests(Number(e.currentTarget.value))}
          >
            <option value="1">1 Adult, 1 Room</option>
            <option value="2">2 Adults, 1 Room</option>
            <option value="4">4 Adults, 2 Rooms</option>
          </select>
        </div>

        <div class="input-grp">
          <label>Rate Plan</label>
          <div class="rate-options-row">
            <label class={`rate-pill-btn ${ratePlan() === 'flexible' ? 'active' : ''}`}>
              <input
                type="radio"
                name="ratePlan"
                checked={ratePlan() === 'flexible'}
                onChange={() => setRatePlan('flexible')}
              />
              <span>Flexible (Free Cancel)</span>
            </label>
            <label class={`rate-pill-btn ${ratePlan() === 'saver' ? 'active' : ''}`}>
              <input
                type="radio"
                name="ratePlan"
                checked={ratePlan() === 'saver'}
                onChange={() => setRatePlan('saver')}
              />
              <span>Saver (Save 10%)</span>
            </label>
          </div>
        </div>

        <div class="price-breakdown">
          <div class="row">
            <span>${pricePerNight()} × {nights()} Nights</span>
            <span>${totalPrice().toLocaleString()}</span>
          </div>
          <div class="row total-row">
            <strong>Estimated Total:</strong>
            <strong>${totalPrice().toLocaleString()} USD</strong>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-block"
          disabled={isProcessing()}
        >
          {isProcessing() ? 'Locking Sanctuary...' : 'Select Room & Reserve'}
        </button>

        <p class="micro-note">
          Instant confirmation via live PMS API. {ratePlan() === 'flexible' ? 'Free cancellation until 48h before check-in.' : 'Advance purchase rate.'}
        </p>
      </form>
    </div>
  );
}
