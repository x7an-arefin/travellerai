import { z } from 'zod';

const VehicleProtectionPlanBaseSchema = z.object({
  id: z.string(),
  planCode: z.enum(['basic_liability', 'collision_damage_waiver', 'loss_damage_waiver', 'full_damage_waiver', 'roadside_assistance']).nullable(),
  name: z.string(),
  dailyRate: z.string(),
  collisionDeductibleAmount: z.string().nullable(),
  theftDeductibleAmount: z.string().nullable(),
  isActive: z.boolean().nullable(),

});


export const UpdateVehicleProtectionPlanOutputSchema = VehicleProtectionPlanBaseSchema;


export type UpdateVehicleProtectionPlanOutput = z.infer<typeof UpdateVehicleProtectionPlanOutputSchema>;
