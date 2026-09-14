import { z } from 'zod';

const RatePlanBaseSchema = z.object({
  id: z.string(),
  roomTypeId: z.string(),
  propertyId: z.string(),
  planCode: z.string(),
  name: z.string(),
  mealPlanType: z.enum(['ep_room_only', 'cp_breakfast', 'map_half_board', 'ap_full_board', 'all_inclusive']).nullable(),
  cancellationPolicyType: z.enum(['flexible_24h', 'moderate_5d', 'strict_14d', 'non_refundable']).nullable(),
  basePriceMultiplier: z.string().nullable(),
  isActive: z.boolean().nullable(),

});


export const ListRatePlanOutputSchema = z.object({
  items: z.array(RatePlanBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListRatePlanOutput = z.infer<typeof ListRatePlanOutputSchema>;
