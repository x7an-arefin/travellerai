import { z } from 'zod';

const PaymentTransactionBaseSchema = z.object({
  id: z.string(),
  bookingId: z.string(),
  amount: z.string(),
  currency: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),

});


export const DeletePaymentTransactionOutputSchema = PaymentTransactionBaseSchema;


export type DeletePaymentTransactionOutput = z.infer<typeof DeletePaymentTransactionOutputSchema>;
