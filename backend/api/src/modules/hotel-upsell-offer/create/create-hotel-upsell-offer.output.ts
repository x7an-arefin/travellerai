import { z } from 'zod';

const HotelUpsellOfferBaseSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  offerType: z.enum(['room_upgrade', 'early_checkin', 'late_checkout', 'meal_upgrade', 'airport_shuttle', 'spa_pass']).nullable(),
  title: z.string(),
  additionalPricePerNight: z.string(),
  isActive: z.boolean().nullable(),

});


export const CreateHotelUpsellOfferOutputSchema = HotelUpsellOfferBaseSchema;


export type CreateHotelUpsellOfferOutput = z.infer<typeof CreateHotelUpsellOfferOutputSchema>;
