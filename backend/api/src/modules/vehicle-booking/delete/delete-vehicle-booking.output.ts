import { z } from 'zod';

const VehicleBookingBaseSchema = z.object({
  id: z.string(),
  bookingReference: z.string(),
  providerId: z.string(),
  pickupDateTime: z.date(),
  returnDateTime: z.date(),
  pickupLocationAddress: z.string(),
  baseRentalAmount: z.string(),
  totalAmount: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleBookingOutputSchema = VehicleBookingBaseSchema;


export type DeleteVehicleBookingOutput = z.infer<typeof DeleteVehicleBookingOutputSchema>;
