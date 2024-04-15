import { create } from "zustand";
import { ParkingSlot } from "../apis/slot/type";

interface ParkingSlotStore {
  editDatas: ParkingSlot | null;
  setEditDatas: (datas: ParkingSlot | null) => void;
}

const useParkingSlotStore = create<ParkingSlotStore>((set) => ({
  editDatas: null,
  setEditDatas: (datas) => set({ editDatas: datas }),
}));

export default useParkingSlotStore;
