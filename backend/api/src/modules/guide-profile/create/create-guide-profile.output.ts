import { z } from 'zod';

const GuideProfileBaseSchema = z.object({
  id: z.string(),
  providerId: z.string(),
  name: z.string(),
  isAvailable: z.boolean().nullable(),
  status: z.enum(['active', 'inactive', 'suspended']).nullable(),

});


export const CreateGuideProfileOutputSchema = GuideProfileBaseSchema;


export type CreateGuideProfileOutput = z.infer<typeof CreateGuideProfileOutputSchema>;
