import { z } from 'zod';


export const UpdateVehicleInspectionInputSchema = z.object({
  vehicleBookingId: z.string().uuid().optional(),
  vehicleId: z.string().uuid().optional(),
  inspectionType: z.enum(['pre_handover', 'post_return']).optional(),
  odometerKm: z.number().int().optional(),
  fuelPercent: z.number().int().optional(),
  cngPressureBar: z.number().int().optional(),
  damageMarkers: z.record(z.string(), z.unknown()).optional(),
  generalNotes: z.string().optional(),
  photoUrls: z.record(z.string(), z.unknown()).optional(),
  inspectorUserId: z.string().uuid().optional(),
  customerSignatureUrl: z.string().max(500).optional(),
  inspectorSignatureUrl: z.string().max(500).optional(),
  inspectionPdfUrl: z.string().max(500).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateVehicleInspectionInput = z.infer<typeof UpdateVehicleInspectionInputSchema>;
