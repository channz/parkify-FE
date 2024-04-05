import { z } from "zod";
import { ParkingSlot } from "../slot/type";

const MAX_MB = 5;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const baseSchema = z.object({
  location: z.string().min(1, { message: "Location name is required" }),
  city: z.string().min(1, { message: "Location is required" }),
});

export const addPictureSchema = z
  .object({
    mode: z.literal("add"),
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
  })
  .merge(baseSchema);

export const editPictureSchema = z
  .object({
    mode: z.literal("edit"),
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
  })
  .merge(baseSchema);

export interface Parking {
  id: number;
  location: string;
  city: string;
  imageloc: string;
  slot?: ParkingSlot[];
}

export const parkingSchema = z.discriminatedUnion("mode", [
  addPictureSchema,
  editPictureSchema,
]);

export type ParkingSchema = z.infer<typeof parkingSchema>;
