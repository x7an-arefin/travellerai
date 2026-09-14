import { z } from 'zod';


export const UpdateVehicleExtraChargeInputSchema = z.object({
  vehicleBookingId: z.string().uuid().optional(),
  chargeType: z.enum(['excess_km', 'fuel_deficit', 'damage_repair', 'traffic_fine', 'late_return_fee', 'toll_reimbursement', 'cleaning_fee']).optional(),
  description: z.string().max(255).optional(),
  amount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  deductionSource: z.enum(['security_deposit', 'direct_bill']).optional(),
  proofPhotoUrls: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['pending_review', 'billed_to_deposit', 'contested_by_renter', 'waived', 'settled']).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleExtraChargeInput = z.infer<typeof UpdateVehicleExtraChargeInputSchema>;
