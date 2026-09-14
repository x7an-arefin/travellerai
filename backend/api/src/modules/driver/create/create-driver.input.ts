import { z } from 'zod';


export const CreateDriverInputSchema = z.object({
  providerId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  fullName: z.string().max(150),
  phone: z.string().max(30),
  email: z.string().max(255).optional(),
  licenseNumber: z.string().max(50),
  licenseCategory: z.string().max(50).optional().default('Commercial'),
  licenseExpiryDate: z.string().max(10),
  licensePhotoFrontUrl: z.string().max(500).optional(),
  licensePhotoBackUrl: z.string().max(500).optional(),
  driverPhotoUrl: z.string().max(500).optional(),
  yearsOfExperience: z.number().int().optional().default(3),
  assignedVehicleId: z.string().uuid().optional(),
  dutyStatus: z.enum(['available', 'on_trip', 'off_duty', 'suspended']).optional().default('available'),
  currentLatitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currentLongitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  overallRating: z.string().regex(/^\d+(\.\d+)?$/).optional().default('5.00'),
  completedTripsCount: z.number().int().optional().default(0),
  isVerified: z.boolean().optional().default(true),
  deletedAt: z.string().datetime().optional(),

});



export type CreateDriverInput = z.infer<typeof CreateDriverInputSchema>;
