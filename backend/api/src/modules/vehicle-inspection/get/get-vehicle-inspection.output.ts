import { z } from 'zod';

const VehicleInspectionBaseSchema = z.object({
  id: z.string(),
  vehicleBookingId: z.string(),
  vehicleId: z.string(),
  inspectionType: z.enum(['pre_handover', 'post_return']).nullable(),
  odometerKm: z.number().int(),
  fuelPercent: z.number().int(),
  inspectedAt: z.date(),

});


export const GetVehicleInspectionOutputSchema = VehicleInspectionBaseSchema;


export type GetVehicleInspectionOutput = z.infer<typeof GetVehicleInspectionOutputSchema>;
