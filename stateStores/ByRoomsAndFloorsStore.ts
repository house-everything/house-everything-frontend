import { create } from 'zustand';

type State = {
  area: string;
  category: string;
  setCategory: (category : string) => void;
  setArea: (area : string) => void;
};

export const useStore = create<State>(((set) => ({
  area: '',
  category: '',
  setCategory: (category: string) => set({ category }),
  setArea: (area: string) => set({ area }),
})));