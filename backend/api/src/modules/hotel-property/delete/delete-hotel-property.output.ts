import { z } from 'zod';

const HotelPropertyBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  name: z.string(),
  slug: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteHotelPropertyOutputSchema = HotelPropertyBaseSchema;


export type DeleteHotelPropertyOutput = z.infer<typeof DeleteHotelPropertyOutputSchema>;
