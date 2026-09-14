import { z } from 'zod';

const VehicleReviewBaseSchema = z.object({
  id: z.string(),
  vehicleBookingId: z.string(),
  vehicleId: z.string().nullable(),
  driverId: z.string().nullable(),
  overallRating: z.number().int(),
  isVerifiedRental: z.boolean().nullable(),
  createdAt: z.date(),

});


export const ListVehicleReviewOutputSchema = z.object({
  items: z.array(VehicleReviewBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListVehicleReviewOutput = z.infer<typeof ListVehicleReviewOutputSchema>;
