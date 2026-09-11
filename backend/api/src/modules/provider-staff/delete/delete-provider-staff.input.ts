import { z } from 'zod';


export const DeleteProviderStaffInputSchema = z.object({
  id: z.string().uuid(),
});



export type DeleteProviderStaffInput = z.infer<typeof DeleteProviderStaffInputSchema>;
