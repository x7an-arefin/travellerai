import { z } from 'zod';

const PriceRuleBaseSchema = z.object({
  id: z.string(),
  packageId: z.string(),
  price: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeletePriceRuleOutputSchema = PriceRuleBaseSchema;


export type DeletePriceRuleOutput = z.infer<typeof DeletePriceRuleOutputSchema>;
