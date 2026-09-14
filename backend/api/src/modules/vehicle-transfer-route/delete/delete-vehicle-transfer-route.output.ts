import { z } from 'zod';

const VehicleTransferRouteBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  originName: z.string(),
  destinationName: z.string(),
  fixedFareAmount: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteVehicleTransferRouteOutputSchema = VehicleTransferRouteBaseSchema;


export type DeleteVehicleTransferRouteOutput = z.infer<typeof DeleteVehicleTransferRouteOutputSchema>;
