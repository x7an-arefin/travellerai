import { z } from 'zod';


export const CreateVehicleBookingInputSchema = z.object({
  bookingReference: z.string().max(25),
  travelerId: z.string().uuid().optional(),
  providerId: z.string().uuid(),
  vehicleId: z.string().uuid().optional(),
  driverId: z.string().uuid().optional(),
  rentalModel: z.enum(['self_drive', 'with_driver']).optional().default('self_drive'),
  serviceType: z.enum(['self_drive_rental', 'airport_transfer_arrival', 'airport_transfer_departure', 'intercity_transfer', 'hourly_city_charter', 'full_day_tour', 'multi_day_outstation']).optional().default('self_drive_rental'),
  pickupDateTime: z.string().datetime(),
  returnDateTime: z.string().datetime(),
  pickupLocationAddress: z.string().max(300),
  pickupLatitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  pickupLongitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  dropoffLocationAddress: z.string().max(300).optional(),
  dropoffLatitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  dropoffLongitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  flightNumber: z.string().max(20).optional(),
  flightEta: z.string().max(20).optional(),
  passengerCount: z.number().int().optional().default(1),
  bookingStatus: z.enum(['pending_payment', 'confirmed', 'assigned', 'en_route_to_pickup', 'arrived_at_pickup', 'in_progress', 'returned', 'completed', 'cancelled']).optional().default('pending_payment'),
  baseRentalAmount: z.string().regex(/^\d+(\.\d+)?$/),
  extrasAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  protectionPlanAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  driverAllowanceAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  taxAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  totalAmount: z.string().regex(/^\d+(\.\d+)?$/),
  securityDepositAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  depositHoldStatus: z.enum(['none', 'authorized', 'captured', 'partial_released', 'fully_released', 'forfeited']).optional().default('none'),
  commissionAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  netProviderAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  paymentStatus: z.enum(['pending', 'authorized', 'paid', 'refunded']).optional().default('pending'),
  otpCode: z.string().max(6).optional(),
  qrCode: z.string().max(500).optional(),
  startedAt: z.string().datetime().optional(),
  completedAt: z.string().datetime().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleBookingInput = z.infer<typeof CreateVehicleBookingInputSchema>;
