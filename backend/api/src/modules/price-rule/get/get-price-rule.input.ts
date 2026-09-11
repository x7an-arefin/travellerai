import { z } from 'zod';


export const GetPriceRuleInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetPriceRuleInput = z.infer<typeof GetPriceRuleInputSchema>;
