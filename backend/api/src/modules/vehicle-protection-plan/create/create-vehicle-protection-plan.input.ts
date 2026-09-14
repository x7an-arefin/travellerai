import { z } from 'zod';


export const CreateVehicleProtectionPlanInputSchema = z.object({
  planCode: z.enum(['basic_liability', 'collision_damage_waiver', 'loss_damage_waiver', 'full_damage_waiver', 'roadside_assistance']).optional().default('collision_damage_waiver'),
  name: z.string().max(100),
  description: z.string().optional(),
  dailyRate: z.string().regex(/^\d+(\.\d+)?$/),
  collisionDeductibleAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('200.00'),
  theftDeductibleAmount: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  glassTireCovered: z.boolean().optional().default(false),
  roadsideAssistanceCovered: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleProtectionPlanInput = z.infer<typeof CreateVehicleProtectionPlanInputSchema>;
