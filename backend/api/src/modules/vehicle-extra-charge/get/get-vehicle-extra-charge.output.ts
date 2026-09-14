import { z } from 'zod';

const VehicleExtraChargeBaseSchema = z.object({
  id: z.string(),
  vehicleBookingId: z.string(),
  chargeType: z.enum(['excess_km', 'fuel_deficit', 'damage_repair', 'traffic_fine', 'late_return_fee', 'toll_reimbursement', 'cleaning_fee']).nullable(),
  description: z.string(),
  amount: z.string(),
  deductionSource: z.enum(['security_deposit', 'direct_bill']).nullable(),
  status: z.enum(['pending_review', 'billed_to_deposit', 'contested_by_renter', 'waived', 'settled']).nullable(),

});


export const GetVehicleExtraChargeOutputSchema = VehicleExtraChargeBaseSchema;


export type GetVehicleExtraChargeOutput = z.infer<typeof GetVehicleExtraChargeOutputSchema>;
