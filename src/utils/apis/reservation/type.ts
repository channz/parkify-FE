import { z } from "zod";

export const reservationSchema = z.object({
  parkingslot_id: z.coerce.number({
    required_error: "Reservation ID is required",
  }),
});

export interface Reservation {
  reservation_id: string;
  parkingslot_id: number;
  vehicle_type: string;
  floor: number;
  slot: number;
  price: number;
  parking_id: number;
  image_loc: string;
  location: string;
  city: string;
  payment_status: string;
}

export type ReservationSchema = z.infer<typeof reservationSchema>;
