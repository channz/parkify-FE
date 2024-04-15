import { z } from "zod";

export const transactionSchema = z.object({
  reservation_id: z.coerce.number({
    required_error: "Reservation ID is required",
  }),
  payment_method: z.string({ required_error: "Payment method is required" }),
});

export interface Transaction {
  transaction_id: string;
  reservation_id: number;
  payment_method: string;
  va_number: number;
  status_message: string;
}

export type TransactionSchema = z.infer<typeof transactionSchema>;
