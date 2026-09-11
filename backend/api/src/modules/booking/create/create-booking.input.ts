import { z } from 'zod';


export const CreateBookingInputSchema = z.object({
  bookingReference: z.string().max(20),
  travelerId: z.string().uuid().optional(),
  packageId: z.string().uuid(),
  departureId: z.string().uuid().optional(),
  guestEmail: z.string().max(255).optional(),
  guestName: z.string().max(200).optional(),
  participantCount: z.number().int(),
  bookingStatus: z.enum(['draft', 'pending_payment', 'payment_processing', 'pending_provider_confirmation', 'confirmed', 'partially_paid', 'fully_paid', 'modification_requested', 'rescheduled', 'cancellation_requested', 'cancelled_by_traveler', 'cancelled_by_provider', 'cancelled_by_admin', 'refund_pending', 'partially_refunded', 'fully_refunded', 'in_progress', 'completed', 'no_show', 'disputed', 'expired']).optional().default('draft'),
  totalAmount: z.string().regex(/^\d+(\.\d+)?$/),
  baseAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  addonAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  discountAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  taxAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  serviceFeeAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  depositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  paidAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  balanceDue: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3),
  displayCurrency: z.string().max(3).optional(),
  exchangeRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  couponCode: z.string().max(50).optional(),
  walletCreditUsed: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  contactName: z.string().max(200),
  contactEmail: z.string().max(255),
  contactPhone: z.string().max(30).optional(),
  pickupLocation: z.string().max(500).optional(),
  specialRequests: z.string().optional(),
  qrCode: z.string().max(500).optional(),
  voucherUrl: z.string().max(500).optional(),
  checkinStatus: z.enum(['pending', 'checked_in', 'no_show']).optional().default('pending'),
  checkinTime: z.string().datetime().optional(),
  inventoryLockedUntil: z.string().datetime().optional(),
  confirmedAt: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;
