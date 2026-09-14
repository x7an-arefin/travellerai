import { z } from 'zod';

const VehicleInspectionBaseSchema = z.object({
  id: z.string(),
  vehicleBookingId: z.string(),
  vehicleId: z.string(),
  odometerKm: z.number().int(),
  fuelPercent: z.number().int(),
  inspectedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleInspectionOutputSchema = VehicleInspectionBaseSchema;


export type DeleteVehicleInspectionOutput = z.infer<typeof DeleteVehicleInspectionOutputSchema>;
