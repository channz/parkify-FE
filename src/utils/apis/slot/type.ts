import { z } from "zod";

export const slotSchema = z.object({
  parking_id: z.coerce.number({ required_error: "Parking ID is required" }),
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
});

export const updateSlotSchema = z.object({
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
});

export interface ParkingSlot {
  parking_id: number;
  VehicleType: any;
  Floor: number;
  Slot: number;
  Price: number;
  Status: string;
  ID: string;
}

export type SlotSchema = z.infer<typeof slotSchema>;
export type UpdateSlotSchema = z.infer<typeof updateSlotSchema>;
