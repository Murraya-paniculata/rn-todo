import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { asyncStorage } from "./middlewares/asyncStorage";

type UserState = {
  name: string;
  hasOnboarded: boolean;
  setName: (name: string) => void;
  completeOnboarding: () => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      hasOnboarded: false,
      setName: (name) => set({ name }),
      completeOnboarding: () => set({ hasOnboarded: true }),
      resetUser: () => set({ name: "", hasOnboarded: false }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => asyncStorage),
      partialize: (state) => ({
        name: state.name,
        hasOnboarded: state.hasOnboarded,
      }),
    },
  ),
);
