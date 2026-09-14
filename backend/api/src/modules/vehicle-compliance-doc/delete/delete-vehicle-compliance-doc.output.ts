import { z } from 'zod';

const VehicleComplianceDocBaseSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  documentNumber: z.string(),
  expiryDate: z.string(),
  documentFileUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleComplianceDocOutputSchema = VehicleComplianceDocBaseSchema;


export type DeleteVehicleComplianceDocOutput = z.infer<typeof DeleteVehicleComplianceDocOutputSchema>;
