import { create } from "zustand";

type Store = {
  showPassword: boolean;
  toggleShowPassword: () => void;
};

const useStore = create<Store>()((set) => ({
  showPassword: false,
  toggleShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));

export default useStore;
