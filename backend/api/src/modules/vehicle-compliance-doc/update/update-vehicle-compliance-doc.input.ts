import { z } from 'zod';


export const UpdateVehicleComplianceDocInputSchema = z.object({
  vehicleId: z.string().uuid().optional(),
  documentType: z.enum(['registration_card', 'insurance_policy', 'fitness_certificate', 'commercial_permit', 'cng_cylinder_test', 'tax_token', 'emission_certificate']).optional(),
  documentNumber: z.string().max(100).optional(),
  issuedDate: z.string().max(10).optional(),
  expiryDate: z.string().max(10).optional(),
  documentFileUrl: z.string().max(500).optional(),
  verificationStatus: z.enum(['pending', 'verified', 'rejected', 'expired']).optional(),
  verifiedBy: z.string().uuid().optional(),
  verifiedAt: z.string().datetime().optional(),
  notes: z.string().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleComplianceDocInput = z.infer<typeof UpdateVehicleComplianceDocInputSchema>;
