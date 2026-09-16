import { createSignal } from 'solid-js';
import type { VehicleItem } from '../../vehicles.model';
import { addToCart } from '../../../cart/cart.store';

interface VehicleBookingWidgetProps {
  vehicle: VehicleItem;
}

export default function VehicleBookingWidget(props: VehicleBookingWidgetProps) {
  const [days, setDays] = createSignal(3);
  const [chauffeur, setChauffeur] = createSignal(false);
  const [protection, setProtection] = createSignal<'included' | 'premium'>('included');
  const [isProcessing, setIsProcessing] = createSignal(false);

  const dailyBase = () => props.vehicle.dailyRate + (chauffeur() ? 220 : 0) + (protection() === 'premium' ? 45 : 0);
  const totalAmount = () => dailyBase() * days();

  const handleReserve = (e: Event) => {
    e.preventDefault();
    setIsProcessing(true);

    addToCart({
      id: `${props.vehicle.id}-${Date.now()}`,
      type: 'vehicle',
      title: `${props.vehicle.make} ${props.vehicle.model}`,
      subtitle: `${days()} Days • ${chauffeur() ? 'Chauffeured VIP' : 'Self-Drive'} • ${props.vehicle.cityLocation}`,
      image: props.vehicle.featuredImage,
      unitPrice: dailyBase(),
      quantity: days(),
      currency: props.vehicle.currency,
      details: {
        days: days(),
        chauffeur: chauffeur(),
        protection: protection(),
        total: totalAmount(),
        city: props.vehicle.cityLocation
      }
    });

    setTimeout(() => {
      window.location.href = '/checkout/vehicle';
    }, 400);
  };

  return (
    <div class="booking-box">
      <div class="price-header">
        <span class="label">Calculated Daily Rate</span>
        <div class="price">
          <span class="val">${dailyBase()}</span>
          <span class="sub">/ day</span>
        </div>
      </div>

      <form onSubmit={handleReserve} class="input-stack">
        <div class="input-grp">
          <label for="veh-hub-val">Station Hub</label>
          <input id="veh-hub-val" type="text" value={props.vehicle.cityLocation} readonly />
        </div>

        <div class="input-grp">
          <label for="veh-days-select">Rental Duration</label>
          <select
            id="veh-days-select"
            value={days()}
            onChange={(e) => setDays(Number(e.currentTarget.value))}
          >
            <option value="1">1 Day (Airport Transfer / Day Hire)</option>
            <option value="3">3 Days (Weekend Getaway)</option>
            <option value="7">7 Days (Full Alpine Tour)</option>
            <option value="14">14 Days (Extended Journey)</option>
          </select>
        </div>

        {props.vehicle.chauffeurAvailable && (
          <div class="input-grp">
            <label>Service Mode</label>
            <div class="rate-options-row">
              <label class={`rate-pill-btn ${!chauffeur() ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="serviceMode"
                  checked={!chauffeur()}
                  onChange={() => setChauffeur(false)}
                />
                <span>Self-Drive VIP</span>
              </label>
              <label class={`rate-pill-btn ${chauffeur() ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="serviceMode"
                  checked={chauffeur()}
                  onChange={() => setChauffeur(true)}
                />
                <span>Chauffeur (+ $220/d)</span>
              </label>
            </div>
          </div>
        )}

        <div class="input-grp">
          <label>Damage Protection Plan</label>
          <div class="rate-options-row">
            <label class={`rate-pill-btn ${protection() === 'included' ? 'active' : ''}`}>
              <input
                type="radio"
                name="protectionPlan"
                checked={protection() === 'included'}
                onChange={() => setProtection('included')}
              />
              <span>Standard CDW</span>
            </label>
            <label class={`rate-pill-btn ${protection() === 'premium' ? 'active' : ''}`}>
              <input
                type="radio"
                name="protectionPlan"
                checked={protection() === 'premium'}
                onChange={() => setProtection('premium')}
              />
              <span>Zero-Excess Comprehensive (+ $45/d)</span>
            </label>
          </div>
        </div>

        <div class="price-breakdown">
          <div class="row">
            <span>${dailyBase()} × {days()} Days</span>
            <span>${totalAmount().toLocaleString()}</span>
          </div>
          <div class="row total-row">
            <strong>Estimated Total:</strong>
            <strong>${totalAmount().toLocaleString()} USD</strong>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-block"
          disabled={isProcessing()}
        >
          {isProcessing() ? 'Securing Fleet...' : 'Reserve Vehicle'}
        </button>

        <p class="micro-note">
          Guaranteed vehicle model. Zero cancellation penalty up to 48 hours prior to pickup.
        </p>
      </form>
    </div>
  );
}
