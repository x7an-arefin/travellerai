import { z } from 'zod';


export const CreateVehicleComplianceDocInputSchema = z.object({
  vehicleId: z.string().uuid(),
  documentType: z.enum(['registration_card', 'insurance_policy', 'fitness_certificate', 'commercial_permit', 'cng_cylinder_test', 'tax_token', 'emission_certificate']).optional().default('registration_card'),
  documentNumber: z.string().max(100),
  issuedDate: z.string().max(10).optional(),
  expiryDate: z.string().max(10),
  documentFileUrl: z.string().max(500),
  verificationStatus: z.enum(['pending', 'verified', 'rejected', 'expired']).optional().default('pending'),
  verifiedBy: z.string().uuid().optional(),
  verifiedAt: z.string().datetime().optional(),
  notes: z.string().optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleComplianceDocInput = z.infer<typeof CreateVehicleComplianceDocInputSchema>;
