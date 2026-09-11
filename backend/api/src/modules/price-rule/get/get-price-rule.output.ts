import { z } from 'zod';

const PriceRuleBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  departureId: z.string().nullable(),
  pricingType: z.enum(['per_person', 'per_adult', 'per_child', 'per_infant', 'per_senior', 'per_student', 'per_group', 'per_vehicle', 'per_room', 'per_hour', 'per_day']).nullable(),
  tierMin: z.number().int().nullable(),
  tierMax: z.number().int().nullable(),
  seasonType: z.enum(['standard', 'peak', 'off_peak', 'weekend', 'holiday', 'special_event']).nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  price: z.string(),
  currency: z.string(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const GetPriceRuleOutputSchema = PriceRuleBaseSchema;


export type GetPriceRuleOutput = z.infer<typeof GetPriceRuleOutputSchema>;
