import { z } from 'zod';


export const UpdateUserInputSchema = z.object({
  email: z.string().max(255).optional(),
  phone: z.string().max(30).optional(),
  passwordHash: z.string().max(255).optional(),
  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
  role: z.enum(['super_admin', 'admin', 'finance_admin', 'content_admin', 'support_agent', 'provider_owner', 'provider_manager', 'provider_finance', 'provider_content', 'guide', 'traveler', 'guest', 'affiliate']).optional(),
  avatarUrl: z.string().max(500).optional(),
  isEmailVerified: z.boolean().optional(),
  isPhoneVerified: z.boolean().optional(),
  status: z.enum(['active', 'suspended', 'banned', 'pending_verification']).optional(),
  lastLoginAt: z.string().datetime().optional(),
  timezone: z.string().max(50).optional(),
  preferredCurrency: z.string().max(3).optional(),
  preferredLanguage: z.string().max(10).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;
