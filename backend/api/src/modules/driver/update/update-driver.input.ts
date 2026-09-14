import { z } from 'zod';


export const UpdateDriverInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  fullName: z.string().max(150).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().max(255).optional(),
  licenseNumber: z.string().max(50).optional(),
  licenseCategory: z.string().max(50).optional(),
  licenseExpiryDate: z.string().max(10).optional(),
  licensePhotoFrontUrl: z.string().max(500).optional(),
  licensePhotoBackUrl: z.string().max(500).optional(),
  driverPhotoUrl: z.string().max(500).optional(),
  yearsOfExperience: z.number().int().optional(),
  assignedVehicleId: z.string().uuid().optional(),
  dutyStatus: z.enum(['available', 'on_trip', 'off_duty', 'suspended']).optional(),
  currentLatitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  currentLongitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  overallRating: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  completedTripsCount: z.number().int().optional(),
  isVerified: z.boolean().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateDriverInput = z.infer<typeof UpdateDriverInputSchema>;
