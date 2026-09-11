import { z } from 'zod';


export const CreateProviderStaffInputSchema = z.object({
  providerId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(['manager', 'finance', 'content', 'guide', 'custom']).optional().default('manager'),
  permissions: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['active', 'inactive', 'invited']).optional().default('invited'),
  invitedAt: z.string().datetime().optional(),
  acceptedAt: z.string().datetime().optional(),

});



export type CreateProviderStaffInput = z.infer<typeof CreateProviderStaffInputSchema>;
