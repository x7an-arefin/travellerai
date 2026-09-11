import { z } from 'zod';


export const CreatePriceRuleInputSchema = z.object({
  packageId: z.string().uuid(),
  departureId: z.string().uuid().optional(),
  pricingType: z.enum(['per_person', 'per_adult', 'per_child', 'per_infant', 'per_senior', 'per_student', 'per_group', 'per_vehicle', 'per_room', 'per_hour', 'per_day']).optional().default('per_person'),
  tierMin: z.number().int().optional(),
  tierMax: z.number().int().optional(),
  seasonType: z.enum(['standard', 'peak', 'off_peak', 'weekend', 'holiday', 'special_event']).optional().default('standard'),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  price: z.string().regex(/^\d+(\.\d+)?$/),
  currency: z.string().max(3),
  status: z.enum(['active', 'inactive']).optional().default('active'),

});



export type CreatePriceRuleInput = z.infer<typeof CreatePriceRuleInputSchema>;
