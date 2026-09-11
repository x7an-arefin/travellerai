import { z } from 'zod';


export const CreateAuditLogInputSchema = z.object({
  actorId: z.string().uuid().optional(),
  actorRole: z.string().max(100).optional(),
  action: z.string().max(200),
  entityType: z.string().max(100).optional(),
  entityId: z.string().uuid().optional(),
  previousState: z.record(z.string(), z.unknown()).optional(),
  newState: z.record(z.string(), z.unknown()).optional(),
  ipAddress: z.string().max(50).optional(),
  userAgent: z.string().max(500).optional(),
  correlationId: z.string().max(100).optional(),
  severity: z.enum(['info', 'warning', 'critical']).optional().default('info'),

});



export type CreateAuditLogInput = z.infer<typeof CreateAuditLogInputSchema>;
