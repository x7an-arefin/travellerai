import { z } from 'zod';


export const CreateRoomTypeInputSchema = z.object({
  propertyId: z.string().uuid(),
  name: z.string().max(150),
  slug: z.string().max(180),
  category: z.enum(['standard_room', 'deluxe_room', 'executive_suite', 'family_suite', 'presidential_suite', 'dormitory_bed', 'villa_bungalow']).optional().default('standard_room'),
  maxOccupancyAdults: z.number().int().default(2),
  maxOccupancyChildren: z.number().int().optional().default(1),
  maxTotalGuests: z.number().int().default(3),
  baseBedType: z.enum(['single', 'double', 'queen', 'king', 'twin', 'bunk_bed', 'sofa_bed']).optional().default('queen'),
  extraBedAvailable: z.boolean().optional().default(false),
  extraBedCost: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  roomSizeSqm: z.number().int().optional(),
  viewType: z.enum(['city_view', 'sea_view', 'garden_view', 'mountain_view', 'pool_view', 'courtyard_view', 'no_view']).optional().default('city_view'),
  bathroomType: z.enum(['private_ensuite', 'shared_bathroom', 'open_plan']).optional().default('private_ensuite'),
  smokingAllowed: z.boolean().optional().default(false),
  basePricePerNight: z.string().regex(/^\d+(\.\d+)?$/),
  totalUnitsCount: z.number().int().default(1),
  amenities: z.record(z.string(), z.unknown()).optional(),
  photos: z.record(z.string(), z.unknown()).optional(),
  isActive: z.boolean().optional().default(true),
  deletedAt: z.string().datetime().optional(),

});



export type CreateRoomTypeInput = z.infer<typeof CreateRoomTypeInputSchema>;
