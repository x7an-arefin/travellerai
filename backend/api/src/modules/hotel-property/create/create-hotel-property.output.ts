import { z } from 'zod';

const HotelPropertyBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  destinationId: z.string().nullable(),
  name: z.string(),
  slug: z.string(),
  propertyType: z.enum(['hotel', 'resort', 'boutique_hotel', 'eco_lodge', 'homestay_guesthouse', 'serviced_apartment', 'hostel', 'camp_glamping']).nullable(),
  starRating: z.number().int().nullable(),
  city: z.string(),
  country: z.string(),
  coverImageUrl: z.string().nullable(),
  status: z.enum(['draft', 'pending_approval', 'active', 'suspended', 'inactive']).nullable(),

});


export const CreateHotelPropertyOutputSchema = HotelPropertyBaseSchema;


export type CreateHotelPropertyOutput = z.infer<typeof CreateHotelPropertyOutputSchema>;
