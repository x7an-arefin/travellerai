import { z } from 'zod';


export const CreateProviderInputSchema = z.object({
  ownerId: z.string().uuid(),
  legalName: z.string().max(255),
  displayName: z.string().max(200),
  slug: z.string().max(250),
  providerType: z.enum(['agency', 'tour_operator', 'guide', 'activity_provider', 'hotel', 'transport_operator', 'dmc', 'experience_host']).optional().default('tour_operator'),
  registrationNumber: z.string().max(100).optional(),
  taxId: z.string().max(100).optional(),
  country: z.string().max(100),
  address: z.string().optional(),
  contactEmail: z.string().max(255),
  contactPhone: z.string().max(30).optional(),
  website: z.string().max(500).optional(),
  logoUrl: z.string().max(500).optional(),
  coverImage: z.string().max(500).optional(),
  description: z.string().optional(),
  languages: z.record(z.string(), z.unknown()).optional(),
  operatingDestinations: z.record(z.string(), z.unknown()).optional(),
  socialLinks: z.record(z.string(), z.unknown()).optional(),
  certifications: z.record(z.string(), z.unknown()).optional(),
  commissionRate: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  kycStatus: z.enum(['not_submitted', 'draft', 'submitted', 'under_review', 'info_required', 'approved', 'rejected', 'suspended', 'expired']).optional().default('not_submitted'),
  approvalStatus: z.enum(['pending', 'approved', 'rejected', 'suspended']).optional().default('pending'),
  rating: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  totalBookings: z.number().int().optional().default(0),
  verifiedBadge: z.boolean().optional().default(false),
  isWithdrawalRestricted: z.boolean().optional().default(false),
  riskLevel: z.enum(['low', 'medium', 'high', 'critical']).optional().default('low'),
  internalNotes: z.string().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateProviderInput = z.infer<typeof CreateProviderInputSchema>;
