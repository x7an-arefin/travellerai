import { z } from 'zod';

const ProviderBaseSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  legalName: z.string(),
  displayName: z.string(),
  slug: z.string(),
  country: z.string(),
  contactEmail: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteProviderOutputSchema = ProviderBaseSchema;


export type DeleteProviderOutput = z.infer<typeof DeleteProviderOutputSchema>;
