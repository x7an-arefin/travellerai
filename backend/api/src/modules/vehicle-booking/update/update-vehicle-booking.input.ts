import { z } from 'zod';


export const UpdateVehicleBookingInputSchema = z.object({
  bookingReference: z.string().max(25).optional(),
  travelerId: z.string().uuid().optional(),
  providerId: z.string().uuid().optional(),
  vehicleId: z.string().uuid().optional(),
  driverId: z.string().uuid().optional(),
  rentalModel: z.enum(['self_drive', 'with_driver']).optional(),
  serviceType: z.enum(['self_drive_rental', 'airport_transfer_arrival', 'airport_transfer_departure', 'intercity_transfer', 'hourly_city_charter', 'full_day_tour', 'multi_day_outstation']).optional(),
  pickupDateTime: z.string().datetime().optional(),
  returnDateTime: z.string().datetime().optional(),
  pickupLocationAddress: z.string().max(300).optional(),
  pickupLatitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  pickupLongitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  dropoffLocationAddress: z.string().max(300).optional(),
  dropoffLatitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  dropoffLongitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  flightNumber: z.string().max(20).optional(),
  flightEta: z.string().max(20).optional(),
  passengerCount: z.number().int().optional(),
  bookingStatus: z.enum(['pending_payment', 'confirmed', 'assigned', 'en_route_to_pickup', 'arrived_at_pickup', 'in_progress', 'returned', 'completed', 'cancelled']).optional(),
  baseRentalAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  extrasAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  protectionPlanAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  driverAllowanceAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  taxAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  totalAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  securityDepositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  depositHoldStatus: z.enum(['none', 'authorized', 'captured', 'partial_released', 'fully_released', 'forfeited']).optional(),
  commissionAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  netProviderAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  paymentStatus: z.enum(['pending', 'authorized', 'paid', 'refunded']).optional(),
  otpCode: z.string().max(6).optional(),
  qrCode: z.string().max(500).optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleBookingInput = z.infer<typeof UpdateVehicleBookingInputSchema>;
