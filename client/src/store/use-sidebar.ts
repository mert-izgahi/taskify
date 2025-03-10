import {create} from "zustand";

export interface ISidebarStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useSidebarStore = create<ISidebarStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}));
