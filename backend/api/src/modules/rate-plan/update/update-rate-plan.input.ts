import { z } from 'zod';


export const UpdateRatePlanInputSchema = z.object({
  roomTypeId: z.string().uuid().optional(),
  propertyId: z.string().uuid().optional(),
  planCode: z.string().max(50).optional(),
  name: z.string().max(100).optional(),
  mealPlanType: z.enum(['ep_room_only', 'cp_breakfast', 'map_half_board', 'ap_full_board', 'all_inclusive']).optional(),
  cancellationPolicyType: z.enum(['flexible_24h', 'moderate_5d', 'strict_14d', 'non_refundable']).optional(),
  cancellationCutoffHours: z.number().int().optional(),
  cancellationPenaltyPercent: z.number().int().optional(),
  isRefundable: z.boolean().optional(),
  minimumStayNights: z.number().int().optional(),
  maximumStayNights: z.number().int().optional(),
  basePriceMultiplier: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  fixedSurcharge: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  isB2BExclusive: z.boolean().optional(),
  isActive: z.boolean().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateRatePlanInput = z.infer<typeof UpdateRatePlanInputSchema>;
