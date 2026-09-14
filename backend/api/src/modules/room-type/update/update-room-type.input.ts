import { z } from 'zod';


export const UpdateRoomTypeInputSchema = z.object({
  propertyId: z.string().uuid().optional(),
  name: z.string().max(150).optional(),
  slug: z.string().max(180).optional(),
  category: z.enum(['standard_room', 'deluxe_room', 'executive_suite', 'family_suite', 'presidential_suite', 'dormitory_bed', 'villa_bungalow']).optional(),
  maxOccupancyAdults: z.number().int().optional(),
  maxOccupancyChildren: z.number().int().optional(),
  maxTotalGuests: z.number().int().optional(),
  baseBedType: z.enum(['single', 'double', 'queen', 'king', 'twin', 'bunk_bed', 'sofa_bed']).optional(),
  extraBedAvailable: z.boolean().optional(),
  extraBedCost: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  roomSizeSqm: z.number().int().optional(),
  viewType: z.enum(['city_view', 'sea_view', 'garden_view', 'mountain_view', 'pool_view', 'courtyard_view', 'no_view']).optional(),
  bathroomType: z.enum(['private_ensuite', 'shared_bathroom', 'open_plan']).optional(),
  smokingAllowed: z.boolean().optional(),
  basePricePerNight: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  totalUnitsCount: z.number().int().optional(),
  amenities: z.record(z.string(), z.unknown()).optional(),
  photos: z.record(z.string(), z.unknown()).optional(),
  isActive: z.boolean().optional(),
  deletedAt: z.string().datetime().optional(),

}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});



export type UpdateRoomTypeInput = z.infer<typeof UpdateRoomTypeInputSchema>;
