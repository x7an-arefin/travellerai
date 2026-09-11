import { z } from 'zod';

const PriceRuleBaseSchema = z.object({
  id: z.string(),
  price: z.string(),
  status: z.enum(['active', 'inactive']).nullable(),

});


export const UpdatePriceRuleOutputSchema = PriceRuleBaseSchema;


export type UpdatePriceRuleOutput = z.infer<typeof UpdatePriceRuleOutputSchema>;
