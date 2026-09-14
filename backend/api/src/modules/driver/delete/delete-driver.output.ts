import { z } from 'zod';

const DriverBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  fullName: z.string(),
  phone: z.string(),
  licenseNumber: z.string(),
  licenseExpiryDate: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteDriverOutputSchema = DriverBaseSchema;


export type DeleteDriverOutput = z.infer<typeof DeleteDriverOutputSchema>;
