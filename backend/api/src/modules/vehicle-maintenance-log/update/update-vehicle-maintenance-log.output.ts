import { z } from 'zod';

const VehicleMaintenanceLogBaseSchema = z.object({
  id: z.string(),
  vehicleId: z.string(),
  serviceType: z.enum(['scheduled_periodic', 'oil_filter_change', 'tire_replacement', 'brake_pad_rotor', 'cng_cylinder_hydrostatic', 'engine_transmission', 'aircon_service', 'emergency_breakdown', 'body_paint']).nullable(),
  odometerAtService: z.number().int(),
  serviceCost: z.string(),
  servicedAt: z.date(),

});


export const UpdateVehicleMaintenanceLogOutputSchema = VehicleMaintenanceLogBaseSchema;


export type UpdateVehicleMaintenanceLogOutput = z.infer<typeof UpdateVehicleMaintenanceLogOutputSchema>;
