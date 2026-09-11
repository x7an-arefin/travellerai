import { z } from 'zod';


export const DeletePriceRuleInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeletePriceRuleInput = z.infer<typeof DeletePriceRuleInputSchema>;
