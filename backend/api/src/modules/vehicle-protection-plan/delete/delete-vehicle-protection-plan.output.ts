import { z } from 'zod';

const VehicleProtectionPlanBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  dailyRate: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleProtectionPlanOutputSchema = VehicleProtectionPlanBaseSchema;


export type DeleteVehicleProtectionPlanOutput = z.infer<typeof DeleteVehicleProtectionPlanOutputSchema>;
