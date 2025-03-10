import { Tab } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ITabsStore {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const useTabsStore = create<ITabsStore>()(
  persist(
    (set) => ({
      activeTab: "home" as Tab,
      setActiveTab: (tab: Tab) => set({ activeTab: tab }),
    }),
    {
      name: "tabs",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

