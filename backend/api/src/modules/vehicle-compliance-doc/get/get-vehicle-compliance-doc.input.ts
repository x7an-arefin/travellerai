import { z } from 'zod';


export const GetVehicleComplianceDocInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetVehicleComplianceDocInput = z.infer<typeof GetVehicleComplianceDocInputSchema>;
