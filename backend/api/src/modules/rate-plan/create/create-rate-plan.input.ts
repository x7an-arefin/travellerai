import { z } from 'zod';


export const CreateRatePlanInputSchema = z.object({
  roomTypeId: z.string().uuid(),
  propertyId: z.string().uuid(),
  planCode: z.string().max(50),
  name: z.string().max(100),
  mealPlanType: z.enum(['ep_room_only', 'cp_breakfast', 'map_half_board', 'ap_full_board', 'all_inclusive']).optional().default('cp_breakfast'),
  cancellationPolicyType: z.enum(['flexible_24h', 'moderate_5d', 'strict_14d', 'non_refundable']).optional().default('flexible_24h'),
  cancellationCutoffHours: z.number().int().optional().default(24),
  cancellationPenaltyPercent: z.number().int().optional().default(0),
  isRefundable: z.boolean().optional().default(true),
  minimumStayNights: z.number().int().optional().default(1),
  maximumStayNights: z.number().int().optional().default(30),
  basePriceMultiplier: z.string().regex(/^\d+(\.\d+)?$/).optional().default('1.0000'),
  fixedSurcharge: z.string().regex(/^\d+(\.\d+)?$/).optional().default('0.00'),
  isB2BExclusive: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  deletedAt: z.string().datetime().optional(),

});



export type CreateRatePlanInput = z.infer<typeof CreateRatePlanInputSchema>;
