import { z } from 'zod';


export const UpdateHotelPropertyInputSchema = z.object({
  providerId: z.string().uuid().optional(),
  destinationId: z.string().uuid().optional(),
  name: z.string().max(200).optional(),
  slug: z.string().max(250).optional(),
  propertyType: z.enum(['hotel', 'resort', 'boutique_hotel', 'eco_lodge', 'homestay_guesthouse', 'serviced_apartment', 'hostel', 'camp_glamping']).optional(),
  starRating: z.number().int().optional(),
  checkInTime: z.string().max(10).optional(),
  checkOutTime: z.string().max(10).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  latitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  longitude: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  phone: z.string().max(30).optional(),
  email: z.string().max(255).optional(),
  description: z.string().optional(),
  coverImageUrl: z.string().max(500).optional(),
  galleryUrls: z.record(z.string(), z.unknown()).optional(),
  taxId: z.string().max(100).optional(),
  businessRegistrationNumber: z.string().max(100).optional(),
  status: z.enum(['draft', 'pending_approval', 'active', 'suspended', 'inactive']).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateHotelPropertyInput = z.infer<typeof UpdateHotelPropertyInputSchema>;
