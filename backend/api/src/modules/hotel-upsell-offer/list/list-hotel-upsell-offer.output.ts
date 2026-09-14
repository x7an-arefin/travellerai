import { z } from 'zod';

const HotelUpsellOfferBaseSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  offerType: z.enum(['room_upgrade', 'early_checkin', 'late_checkout', 'meal_upgrade', 'airport_shuttle', 'spa_pass']).nullable(),
  title: z.string(),
  additionalPricePerNight: z.string(),
  isActive: z.boolean().nullable(),

});


export const ListHotelUpsellOfferOutputSchema = z.object({
  items: z.array(HotelUpsellOfferBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListHotelUpsellOfferOutput = z.infer<typeof ListHotelUpsellOfferOutputSchema>;
