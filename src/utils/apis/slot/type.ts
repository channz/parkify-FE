import { z } from "zod";

export const slotSchema = z.object({
  parking_id: z.number({ required_error: "Parking ID is required" }).array(),
  vehicle_type: z.enum(["car", "motorcycle"], {
    required_error: "You need to select a vehicle type",
  }),
  floor: z
    .number()
    .min(1, { message: "Floor cannot be empty" })
    .max(1, { message: "Currently available floors are limited" }),
  slot: z
    .number()
    .min(1, { message: "Slot cannot be empty" })
    .max(2, { message: "Currently available parking slot are limited" }),
  price: z.number().min(4, { message: "You need to fill the price" }),
  status: z.string().min(1, { message: "Status parking slot is Required" }),
});

export interface ParkingSlot {
  parking_id: number;
  vehicle_type: string;
  floor: number;
  slot: number;
  price: number;
  status: string;
}

export type SlotSchema = z.infer<typeof slotSchema>;
