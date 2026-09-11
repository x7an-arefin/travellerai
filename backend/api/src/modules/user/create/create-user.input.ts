import { z } from 'zod';


export const CreateUserInputSchema = z.object({
  email: z.string().max(255),
  phone: z.string().max(30).optional(),
  passwordHash: z.string().max(255).optional(),
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  role: z.enum(['super_admin', 'admin', 'finance_admin', 'content_admin', 'support_agent', 'provider_owner', 'provider_manager', 'provider_finance', 'provider_content', 'guide', 'traveler', 'guest', 'affiliate']).optional().default('traveler'),
  avatarUrl: z.string().max(500).optional(),
  isEmailVerified: z.boolean().optional().default(false),
  isPhoneVerified: z.boolean().optional().default(false),
  status: z.enum(['active', 'suspended', 'banned', 'pending_verification']).optional().default('pending_verification'),
  lastLoginAt: z.string().datetime().optional(),
  timezone: z.string().max(50).optional(),
  preferredCurrency: z.string().max(3).optional(),
  preferredLanguage: z.string().max(10).optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
