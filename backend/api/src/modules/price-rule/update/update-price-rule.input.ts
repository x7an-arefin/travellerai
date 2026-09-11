import { z } from 'zod';


export const UpdatePriceRuleInputSchema = z.object({
  packageId: z.string().uuid().optional(),
  departureId: z.string().uuid().optional(),
  pricingType: z.enum(['per_person', 'per_adult', 'per_child', 'per_infant', 'per_senior', 'per_student', 'per_group', 'per_vehicle', 'per_room', 'per_hour', 'per_day']).optional(),
  tierMin: z.number().int().optional(),
  tierMax: z.number().int().optional(),
  seasonType: z.enum(['standard', 'peak', 'off_peak', 'weekend', 'holiday', 'special_event']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  price: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currency: z.string().max(3).optional(),
  status: z.enum(['active', 'inactive']).optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdatePriceRuleInput = z.infer<typeof UpdatePriceRuleInputSchema>;
