import { create } from 'zustand';

type State = {
  location: string;
  setLocation: (location: string) => void;
};

export const useStore = create<State>(((set) => ({
  location: '',
  setLocation: (location: string) => set({ location }),
})));