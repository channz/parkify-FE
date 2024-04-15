import { z } from  "zod";

const MAX_MB = 5;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const reservationSchema = z.object({
  parking_id: z.coerce.number({ required_error: "Reservation ID is required" }),
  reservation_id: z.coerce.number({ required_error: "Reservation ID is required" }),
  parkingslot_id: z.coerce.number({ required_error: "Reservation ID is required" }),
  vehicle_type: z.enum(["car", "motorcycle"], {
    required_error: "You need to select a vehicle type",
  }),
  floor: z.coerce
    .number()
    .min(1, { message: "Floor cannot be empty" })
    .max(10, { message: "Currently available floors are limited" }),
    slot: z.coerce
    .number()
    .min(1, { message: "Slot cannot be empty" })
    .max(10, { message: "Currently available parking slot are limited" }),
  price: z.coerce.number().min(4, { message: "You need to fill the price" }),
  location: z.string().min(1, { message: "Location name is required" }),
  city: z.string().min(1, { message: "Location is required" }),
  imageloc: z
    .instanceof(File)
    .refine((file) => file.name !== "", "Cover image is required")
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
});

export const updateReservationSchema = z.object ({
  parking_id: z.coerce.number({ required_error: "Reservation ID is required" }),
  reservation_id: z.coerce.number({ required_error: "Reservation ID is required" }),
  parkingslot_id: z.coerce.number({ required_error: "Reservation ID is required" }),
  vehicle_type: z.enum(["car", "motorcycle"], {
    required_error: "You need to select a vehicle type",
  }),
  floor: z.coerce
    .number()
    .min(1, { message: "Floor cannot be empty" })
    .max(10, { message: "Currently available floors are limited" }),
    slot: z.coerce
    .number()
    .min(1, { message: "Slot cannot be empty" })
    .max(10, { message: "Currently available parking slot are limited" }),
  price: z.coerce.number().min(4, { message: "You need to fill the price" }),
  location: z.string().min(1, { message: "Location name is required" }),
  city: z.string().min(1, { message: "Location is required" }),
  imageloc: z
    .instanceof(File)
    .refine((file) => file.name !== "", "Cover image is required")
    .refine(
      (file) => file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
});

export interface Reservation {
  reservation_id: number;
  parkingslot_id: number;
  vehicle_type: string;
  floor: number;
  slot: number;
  price: number;
  parking_id: number;
  image_loc: string;
  location: string;
  city: string;
}

export type ReservationSchema = z.infer<typeof reservationSchema>;
export type UpdateReservationSchema = z.infer<typeof updateReservationSchema>;