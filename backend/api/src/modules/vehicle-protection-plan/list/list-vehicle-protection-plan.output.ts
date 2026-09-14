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


export const ListVehicleProtectionPlanOutputSchema = z.object({
  items: z.array(VehicleProtectionPlanBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListVehicleProtectionPlanOutput = z.infer<typeof ListVehicleProtectionPlanOutputSchema>;
