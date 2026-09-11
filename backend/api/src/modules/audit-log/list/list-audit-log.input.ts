import { z } from 'zod';


export const ListAuditLogInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(500).optional().default(50),
  actorId: z.string().optional(),
  entityType: z.string().optional(),
  severity: z.string().optional(),

});


export type ListAuditLogInput = z.infer<typeof ListAuditLogInputSchema>;
