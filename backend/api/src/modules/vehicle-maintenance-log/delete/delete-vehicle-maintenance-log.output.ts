import { z } from 'zod';

const VehicleMaintenanceLogBaseSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  description: z.string(),
  odometerAtService: z.number().int(),
  serviceCost: z.string(),
  servicedAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleMaintenanceLogOutputSchema = VehicleMaintenanceLogBaseSchema;


export type DeleteVehicleMaintenanceLogOutput = z.infer<typeof DeleteVehicleMaintenanceLogOutputSchema>;
