import { z } from 'zod';


export const UpdateProviderInputSchema = z.object({
  ownerId: z.string().uuid().optional(),
  legalName: z.string().max(255).optional(),
  displayName: z.string().max(200).optional(),
  slug: z.string().max(250).optional(),
  providerType: z.enum(['agency', 'tour_operator', 'guide', 'activity_provider', 'hotel', 'transport_operator', 'dmc', 'experience_host']).optional(),
  registrationNumber: z.string().max(100).optional(),
  taxId: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  address: z.string().optional(),
  contactEmail: z.string().max(255).optional(),
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
  kycStatus: z.enum(['not_submitted', 'draft', 'submitted', 'under_review', 'info_required', 'approved', 'rejected', 'suspended', 'expired']).optional(),
  approvalStatus: z.enum(['pending', 'approved', 'rejected', 'suspended']).optional(),
  rating: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  totalBookings: z.number().int().optional(),
  verifiedBadge: z.boolean().optional(),
  isWithdrawalRestricted: z.boolean().optional(),
  riskLevel: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  internalNotes: z.string().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateProviderInput = z.infer<typeof UpdateProviderInputSchema>;
