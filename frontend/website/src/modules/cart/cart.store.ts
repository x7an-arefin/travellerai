import { atom, map } from 'nanostores';

export interface BookingCartItem {
  id: string;
  type: 'tour' | 'hotel' | 'vehicle';
  title: string;
  subtitle: string;
  image: string;
  unitPrice: number;
  quantity: number;
  currency: string;
  startDate?: string;
  endDate?: string;
  details?: Record<string, any>;
}

export const $cart = atom<BookingCartItem[]>([]);
export const $currency = atom<string>('USD');
export const $favorites = atom<string[]>([]);
export const $activeTab = atom<'tours' | 'hotels' | 'vehicles'>('tours');

export function addToCart(item: BookingCartItem) {
  const current = $cart.get();
  $cart.set([...current, item]);
}

export function removeFromCart(id: string) {
  $cart.set($cart.get().filter(i => i.id !== id));
}

export function clearCart() {
  $cart.set([]);
}

export function toggleFavorite(id: string) {
  const favs = $favorites.get();
  if (favs.includes(id)) {
    $favorites.set(favs.filter(f => f !== id));
  } else {
    $favorites.set([...favs, id]);
  }
}
