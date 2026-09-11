import { z } from 'zod';

const AuditLogBaseSchema = z.object({
  id: z.string(),
  actorId: z.string().nullable(),
  actorRole: z.string().nullable(),
  action: z.string(),
  entityType: z.string().nullable(),
  entityId: z.string().nullable(),
  severity: z.enum(['info', 'warning', 'critical']).nullable(),

});


export const ListAuditLogOutputSchema = z.object({
  items: z.array(AuditLogBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListAuditLogOutput = z.infer<typeof ListAuditLogOutputSchema>;
