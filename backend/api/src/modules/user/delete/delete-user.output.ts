import { z } from 'zod';

const UserBaseSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeleteUserOutputSchema = UserBaseSchema;


export type DeleteUserOutput = z.infer<typeof DeleteUserOutputSchema>;
