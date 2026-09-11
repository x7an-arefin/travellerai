import { z } from 'zod';


export const GetProviderStaffInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetProviderStaffInput = z.infer<typeof GetProviderStaffInputSchema>;
