import { z } from 'zod';


export const DeleteVehicleComplianceDocInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteVehicleComplianceDocInput = z.infer<typeof DeleteVehicleComplianceDocInputSchema>;
