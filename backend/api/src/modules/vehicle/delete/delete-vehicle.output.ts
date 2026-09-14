import { z } from 'zod';

const VehicleBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  registrationNumber: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number().int(),
  seatingCapacity: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleOutputSchema = VehicleBaseSchema;


export type DeleteVehicleOutput = z.infer<typeof DeleteVehicleOutputSchema>;
