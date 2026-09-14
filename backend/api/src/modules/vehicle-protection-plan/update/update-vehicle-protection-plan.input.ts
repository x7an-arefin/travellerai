import { z } from 'zod';


export const UpdateVehicleProtectionPlanInputSchema = z.object({
  planCode: z.enum(['basic_liability', 'collision_damage_waiver', 'loss_damage_waiver', 'full_damage_waiver', 'roadside_assistance']).optional(),
  name: z.string().max(100).optional(),
  description: z.string().optional(),
  dailyRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  collisionDeductibleAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  theftDeductibleAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  glassTireCovered: z.boolean().optional(),
  roadsideAssistanceCovered: z.boolean().optional(),
  isActive: z.boolean().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleProtectionPlanInput = z.infer<typeof UpdateVehicleProtectionPlanInputSchema>;
