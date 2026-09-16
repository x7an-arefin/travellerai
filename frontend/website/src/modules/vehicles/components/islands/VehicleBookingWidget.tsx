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

  const chauffeurSurcharge = () => (chauffeur() ? 220 : 0);
  const protectionSurcharge = () => (protection() === 'premium' ? 45 : 0);
  const dailyBase = () => props.vehicle.dailyRate + chauffeurSurcharge() + protectionSurcharge();
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
        {/* Station Hub */}
        <div class="input-grp">
          <label for="veh-hub-val">Station Hub</label>
          <div class="shadcn-input-wrap">
            <span class="input-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </span>
            <input
              id="veh-hub-val"
              type="text"
              class="shadcn-input"
              value={props.vehicle.cityLocation}
              readOnly
            />
          </div>
        </div>

        {/* Rental Duration Dropdown (Shadcn Style) */}
        <div class="input-grp">
          <label for="veh-days-select">Rental Duration</label>
          <select
            id="veh-days-select"
            class="shadcn-select"
            value={days()}
            onChange={(e) => setDays(Number(e.currentTarget.value))}
          >
            <option value={1} selected={days() === 1}>1 Day (Airport Transfer / Day Hire)</option>
            <option value={3} selected={days() === 3}>3 Days (Weekend Getaway — Popular)</option>
            <option value={7} selected={days() === 7}>7 Days (Full Alpine Tour — Weekly Tier)</option>
            <option value={14} selected={days() === 14}>14 Days (Grand Extended Journey)</option>
          </select>
        </div>

        {/* Service Mode Segmented Control */}
        {props.vehicle.chauffeurAvailable && (
          <div class="input-grp">
            <label>Service Mode</label>
            <div class="segmented-control-group" role="radiogroup" aria-label="Service Mode">
              <label class={`segmented-control-item ${!chauffeur() ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="serviceMode"
                  checked={!chauffeur()}
                  onChange={() => setChauffeur(false)}
                />
                <span class="seg-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                  </svg>
                  Self-Drive VIP
                </span>
                <span class="seg-sub">Standard Fleet</span>
              </label>

              <label class={`segmented-control-item ${chauffeur() ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="serviceMode"
                  checked={chauffeur()}
                  onChange={() => setChauffeur(true)}
                />
                <span class="seg-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Chauffeured
                </span>
                <span class="seg-sub">+ $220 / day</span>
              </label>
            </div>
          </div>
        )}

        {/* Damage Protection Plan Segmented Control */}
        <div class="input-grp">
          <label>Damage Protection Tier</label>
          <div class="segmented-control-group" role="radiogroup" aria-label="Damage Protection Tier">
            <label class={`segmented-control-item ${protection() === 'included' ? 'active' : ''}`}>
              <input
                type="radio"
                name="protectionPlan"
                checked={protection() === 'included'}
                onChange={() => setProtection('included')}
              />
              <span class="seg-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Standard CDW
              </span>
              <span class="seg-sub">Included in Rate</span>
            </label>

            <label class={`segmented-control-item ${protection() === 'premium' ? 'active' : ''}`}>
              <input
                type="radio"
                name="protectionPlan"
                checked={protection() === 'premium'}
                onChange={() => setProtection('premium')}
              />
              <span class="seg-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                Zero-Excess
              </span>
              <span class="seg-sub">+ $45 / day</span>
            </label>
          </div>
        </div>

        {/* Price Breakdown */}
        <div class="price-breakdown">
          <div class="row">
            <span>Base Fleet (${props.vehicle.dailyRate} × {days()}d)</span>
            <span>${(props.vehicle.dailyRate * days()).toLocaleString()}</span>
          </div>

          {chauffeur() && (
            <div class="row">
              <span>Chauffeured Service ($220 × {days()}d)</span>
              <span>+${(220 * days()).toLocaleString()}</span>
            </div>
          )}

          {protection() === 'premium' && (
            <div class="row">
              <span>Zero-Excess Coverage ($45 × {days()}d)</span>
              <span>+${(45 * days()).toLocaleString()}</span>
            </div>
          )}

          <div class="row total-row">
            <span>Estimated Total ({props.vehicle.currency}):</span>
            <span>${totalAmount().toLocaleString()} USD</span>
          </div>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          class="btn btn-primary btn-block"
          disabled={isProcessing()}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          {isProcessing() ? 'Securing Fleet...' : 'Reserve Vehicle'}
        </button>

        <p class="micro-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          Guaranteed model. Zero penalty cancellation up to 48 hours prior.
        </p>
      </form>
    </div>
  );
}
