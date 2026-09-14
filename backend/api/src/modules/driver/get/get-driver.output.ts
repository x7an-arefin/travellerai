import { z } from 'zod';

const DriverBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  fullName: z.string(),
  phone: z.string(),
  licenseNumber: z.string(),
  dutyStatus: z.enum(['available', 'on_trip', 'off_duty', 'suspended']).nullable(),
  overallRating: z.string().nullable(),
  completedTripsCount: z.number().int().nullable(),

});


export const GetDriverOutputSchema = DriverBaseSchema;


export type GetDriverOutput = z.infer<typeof GetDriverOutputSchema>;
