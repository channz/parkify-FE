export interface Reservation {
  reservation_id: number;
  email: string;
  parking_slot_id: number;
  vehicle_type: string;
  floor: number;
  slot: number;
  price: number;
  parking_id: number;
  image_loc: string;
}
