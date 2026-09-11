import { z } from 'zod';


export const GetAuditLogInputSchema = z.object({
  id: z.string().uuid(),
});



export type GetAuditLogInput = z.infer<typeof GetAuditLogInputSchema>;
