import { z } from 'zod';


export const GetPackageInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetPackageInput = z.infer<typeof GetPackageInputSchema>;
