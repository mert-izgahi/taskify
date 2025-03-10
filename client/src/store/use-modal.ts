import { create } from "zustand";

export interface IModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useModalStore = create<IModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
