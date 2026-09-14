import { z } from 'zod';


export const DeleteInventoryCalendarInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteInventoryCalendarInput = z.infer<typeof DeleteInventoryCalendarInputSchema>;
