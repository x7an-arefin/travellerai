import { z } from 'zod';


export const UpdateHotelUpsellOfferInputSchema = z.object({
  propertyId: z.string().uuid().optional(),
  offerType: z.enum(['room_upgrade', 'early_checkin', 'late_checkout', 'meal_upgrade', 'airport_shuttle', 'spa_pass']).optional(),
  title: z.string().max(150).optional(),
  description: z.string().optional(),
  targetRoomTypeId: z.string().uuid().optional(),
  upgradedRoomTypeId: z.string().uuid().optional(),
  additionalPricePerNight: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  isActive: z.boolean().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateHotelUpsellOfferInput = z.infer<typeof UpdateHotelUpsellOfferInputSchema>;
