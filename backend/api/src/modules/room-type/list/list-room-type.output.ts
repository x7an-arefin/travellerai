import { z } from 'zod';

const RoomTypeBaseSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  name: z.string(),
  category: z.enum(['standard_room', 'deluxe_room', 'executive_suite', 'family_suite', 'presidential_suite', 'dormitory_bed', 'villa_bungalow']).nullable(),
  maxTotalGuests: z.number().int(),
  basePricePerNight: z.string(),
  totalUnitsCount: z.number().int(),
  isActive: z.boolean().nullable(),

});


export const ListRoomTypeOutputSchema = z.object({
  items: z.array(RoomTypeBaseSchema),
  nextCursor: z.string().nullable(),
  hasMore: z.boolean(),
});


export type ListRoomTypeOutput = z.infer<typeof ListRoomTypeOutputSchema>;
