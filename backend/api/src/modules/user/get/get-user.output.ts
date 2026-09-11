import { z } from 'zod';

const UserBaseSchema = z.object({
  id: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['super_admin', 'admin', 'finance_admin', 'content_admin', 'support_agent', 'provider_owner', 'provider_manager', 'provider_finance', 'provider_content', 'guide', 'traveler', 'guest', 'affiliate']).nullable(),
  avatarUrl: z.string().nullable(),
  status: z.enum(['active', 'suspended', 'banned', 'pending_verification']).nullable(),
  timezone: z.string().nullable(),
  preferredCurrency: z.string().nullable(),
  preferredLanguage: z.string().nullable(),

});


export const GetUserOutputSchema = UserBaseSchema;


export type GetUserOutput = z.infer<typeof GetUserOutputSchema>;
