import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GetCurrentWeather } from "../types";

interface State {
  location: GetCurrentWeather[];
  setLocation: (value: GetCurrentWeather) => void;
  removeLocation: (value: GetCurrentWeather[]) => void;
}

const useStore = create<State>()(
  persist(
    (set) => ({
      location: [],
      setLocation: (value) =>
        set((state) => ({ location: [...state.location, value] })),
      removeLocation: (value) => set({ location: [...value] }),
    }),
    {
      name: "weeather",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
