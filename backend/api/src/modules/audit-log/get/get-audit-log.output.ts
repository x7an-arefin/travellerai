import { z } from 'zod';

const AuditLogBaseSchema = z.object({
  id: z.string(),
  actorId: z.string().nullable(),
  actorRole: z.string().nullable(),
  action: z.string(),
  entityType: z.string().nullable(),
  entityId: z.string().nullable(),
  previousState: z.record(z.string(), z.unknown()).nullable(),
  newState: z.record(z.string(), z.unknown()).nullable(),
  ipAddress: z.string().nullable(),
  correlationId: z.string().nullable(),
  severity: z.enum(['info', 'warning', 'critical']).nullable(),

});


export const GetAuditLogOutputSchema = AuditLogBaseSchema;


export type GetAuditLogOutput = z.infer<typeof GetAuditLogOutputSchema>;
