import { z } from 'zod';


export const CreateVehicleInspectionInputSchema = z.object({
  vehicleBookingId: z.string().uuid(),
  vehicleId: z.string().uuid(),
  inspectionType: z.enum(['pre_handover', 'post_return']).optional().default('pre_handover'),
  odometerKm: z.number().int(),
  fuelPercent: z.number().int().default(100),
  cngPressureBar: z.number().int().optional(),
  damageMarkers: z.record(z.string(), z.unknown()).optional(),
  generalNotes: z.string().optional(),
  photoUrls: z.record(z.string(), z.unknown()).optional(),
  inspectorUserId: z.string().uuid().optional(),
  customerSignatureUrl: z.string().max(500).optional(),
  inspectorSignatureUrl: z.string().max(500).optional(),
  inspectionPdfUrl: z.string().max(500).optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateVehicleInspectionInput = z.infer<typeof CreateVehicleInspectionInputSchema>;
