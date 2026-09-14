import { z } from 'zod';


export const CreateVehicleMaintenanceLogInputSchema = z.object({
  vehicleId: z.string().uuid(),
  serviceType: z.enum(['scheduled_periodic', 'oil_filter_change', 'tire_replacement', 'brake_pad_rotor', 'cng_cylinder_hydrostatic', 'engine_transmission', 'aircon_service', 'emergency_breakdown', 'body_paint']).optional().default('scheduled_periodic'),
  description: z.string(),
  odometerAtService: z.number().int(),
  serviceCost: z.string().regex(/^\d+(\.\d+)?$/),
  serviceProviderName: z.string().max(150).optional(),
  invoicePdfUrl: z.string().max(500).optional(),
  nextServiceDueOdometer: z.number().int().optional(),
  nextServiceDueDate: z.string().max(10).optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleMaintenanceLogInput = z.infer<typeof CreateVehicleMaintenanceLogInputSchema>;
