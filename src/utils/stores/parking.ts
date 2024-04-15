import { create } from "zustand";
import { Parking } from "../apis/parking/type";

interface ParkingStore {
  editData: Parking | null;
  setEditData: (data: Parking | null) => void;
}

const useParkingStore = create<ParkingStore>((set) => ({
  editData: null,
  setEditData: (data) => set({ editData: data }),
}));

export default useParkingStore;
