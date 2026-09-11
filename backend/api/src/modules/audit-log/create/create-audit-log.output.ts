import { z } from 'zod';

const AuditLogBaseSchema = z.object({
  id: z.string(),
  actorId: z.string().nullable(),
  action: z.string(),
  entityType: z.string().nullable(),
  entityId: z.string().nullable(),
  severity: z.enum(['info', 'warning', 'critical']).nullable(),

});


export const CreateAuditLogOutputSchema = AuditLogBaseSchema;


export type CreateAuditLogOutput = z.infer<typeof CreateAuditLogOutputSchema>;
