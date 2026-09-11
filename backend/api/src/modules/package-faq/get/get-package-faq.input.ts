import { z } from 'zod';


export const GetPackageFaqInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetPackageFaqInput = z.infer<typeof GetPackageFaqInputSchema>;
