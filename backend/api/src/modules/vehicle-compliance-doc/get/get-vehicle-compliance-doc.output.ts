import { z } from 'zod';

const VehicleComplianceDocBaseSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  documentType: z.enum(['registration_card', 'insurance_policy', 'fitness_certificate', 'commercial_permit', 'cng_cylinder_test', 'tax_token', 'emission_certificate']).nullable(),
  documentNumber: z.string(),
  expiryDate: z.string(),
  verificationStatus: z.enum(['pending', 'verified', 'rejected', 'expired']).nullable(),

});


export const GetVehicleComplianceDocOutputSchema = VehicleComplianceDocBaseSchema;


export type GetVehicleComplianceDocOutput = z.infer<typeof GetVehicleComplianceDocOutputSchema>;
