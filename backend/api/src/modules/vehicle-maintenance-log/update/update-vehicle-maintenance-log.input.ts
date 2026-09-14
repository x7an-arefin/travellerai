import { z } from 'zod';


export const UpdateVehicleMaintenanceLogInputSchema = z.object({
  vehicleId: z.string().uuid().optional(),
  serviceType: z.enum(['scheduled_periodic', 'oil_filter_change', 'tire_replacement', 'brake_pad_rotor', 'cng_cylinder_hydrostatic', 'engine_transmission', 'aircon_service', 'emergency_breakdown', 'body_paint']).optional(),
  description: z.string().optional(),
  odometerAtService: z.number().int().optional(),
  serviceCost: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  serviceProviderName: z.string().max(150).optional(),
  invoicePdfUrl: z.string().max(500).optional(),
  nextServiceDueOdometer: z.number().int().optional(),
  nextServiceDueDate: z.string().max(10).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleMaintenanceLogInput = z.infer<typeof UpdateVehicleMaintenanceLogInputSchema>;
