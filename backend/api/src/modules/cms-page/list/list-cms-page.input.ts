import { z } from 'zod';


export const ListCmsPageInputSchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  templateType: z.string().optional(),
  status: z.string().optional(),
  language: z.string().optional(),

});


export type ListCmsPageInput = z.infer<typeof ListCmsPageInputSchema>;
