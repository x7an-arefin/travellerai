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


export const ListVehicleInspectionOutputSchema = z.object({
  items: z.array(VehicleInspectionBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListVehicleInspectionOutput = z.infer<typeof ListVehicleInspectionOutputSchema>;
