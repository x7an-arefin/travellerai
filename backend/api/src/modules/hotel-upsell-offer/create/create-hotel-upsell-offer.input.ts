import { z } from 'zod';


export const CreateHotelUpsellOfferInputSchema = z.object({
  propertyId: z.string().uuid(),
  offerType: z.enum(['room_upgrade', 'early_checkin', 'late_checkout', 'meal_upgrade', 'airport_shuttle', 'spa_pass']).optional().default('room_upgrade'),
  title: z.string().max(150),
  description: z.string().optional(),
  targetRoomTypeId: z.string().uuid().optional(),
  upgradedRoomTypeId: z.string().uuid().optional(),
  additionalPricePerNight: z.string().regex(/^\d+(\.\d+)?$/),
  isActive: z.boolean().optional().default(true),
  deletedAt: z.string().datetime().optional(),

});



export type CreateHotelUpsellOfferInput = z.infer<typeof CreateHotelUpsellOfferInputSchema>;
