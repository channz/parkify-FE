import { z } from "zod";
import { User } from "../user/type";

const MAX_MB = 5;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const addParkingSchema = z.object({
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

export const updateParkingSchema = z.object({
  location: z.string().min(1, { message: "Location name is required" }),
  city: z.string().min(1, { message: "Location is required" }),
  imageloc: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.name !== "", "Cover image is required")
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE,
      `Max image size is ${MAX_MB}MB`
    )
    .refine(
      (file) =>
        !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    ),
});

export interface Parking<T = any> {
  ID: string;
  location: string;
  city: string;
  imageloc: string;
  parking_slot: T;
  user_id: string;
  user: User;
}

export type AddParkingSchema = z.infer<typeof addParkingSchema>;
export type UpdateParkingSchema = z.infer<typeof updateParkingSchema>;
