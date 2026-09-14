import { z } from 'zod';


export const CreateHotelPropertyInputSchema = z.object({
  providerId: z.string().uuid(),
  destinationId: z.string().uuid().optional(),
  name: z.string().max(200),
  slug: z.string().max(250),
  propertyType: z.enum(['hotel', 'resort', 'boutique_hotel', 'eco_lodge', 'homestay_guesthouse', 'serviced_apartment', 'hostel', 'camp_glamping']).optional().default('hotel'),
  starRating: z.number().int().optional().default(3),
  checkInTime: z.string().max(10).optional().default('14:00'),
  checkOutTime: z.string().max(10).optional().default('11:00'),
  address: z.string().max(500),
  city: z.string().max(100),
  country: z.string().max(100),
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
  status: z.enum(['draft', 'pending_approval', 'active', 'suspended', 'inactive']).optional().default('draft'),
  metadata: z.record(z.string(), z.unknown()).optional(),
  deletedAt: z.string().datetime().optional(),

});



export type CreateHotelPropertyInput = z.infer<typeof CreateHotelPropertyInputSchema>;
