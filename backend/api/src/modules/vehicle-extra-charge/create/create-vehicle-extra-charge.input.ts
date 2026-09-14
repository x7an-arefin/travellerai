import { z } from 'zod';


export const CreateVehicleExtraChargeInputSchema = z.object({
  vehicleBookingId: z.string().uuid(),
  chargeType: z.enum(['excess_km', 'fuel_deficit', 'damage_repair', 'traffic_fine', 'late_return_fee', 'toll_reimbursement', 'cleaning_fee']).optional().default('excess_km'),
  description: z.string().max(255),
  amount: z.string().regex(/^\d+(\.\d+)?$/),
  deductionSource: z.enum(['security_deposit', 'direct_bill']).optional().default('security_deposit'),
  proofPhotoUrls: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['pending_review', 'billed_to_deposit', 'contested_by_renter', 'waived', 'settled']).optional().default('pending_review'),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleExtraChargeInput = z.infer<typeof CreateVehicleExtraChargeInputSchema>;
