import { z } from 'zod';


export const ListPriceRuleInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  packageId: z.string().optional(),
  departureId: z.string().optional(),
  pricingType: z.string().optional(),
  seasonType: z.string().optional(),
  status: z.string().optional(),

});


export type ListPriceRuleInput = z.infer<typeof ListPriceRuleInputSchema>;
