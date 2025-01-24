import { create } from "zustand";
import { BoxData, BoxDimensions } from "./types";

interface BoxStore {
  dimensions: BoxDimensions;
  boxData: BoxData | null;
  isDarkMode: boolean;
  setDimensions: (dimensions: BoxDimensions) => void;
  setBoxData: (data: BoxData) => void;
  toggleDarkMode: () => void;
}

export const useBoxStore = create<BoxStore>((set) => ({
  dimensions: {
    length: 50,
    width: 40,
    height: 30,
  },
  boxData: null,
  isDarkMode: false,
  setDimensions: (dimensions) => set({ dimensions }),
  setBoxData: (data) => set({ boxData: data }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
