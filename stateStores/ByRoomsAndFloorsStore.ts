import { create } from 'zustand';

type State = {
  floors: any;
  rooms: { name: string, floor: string }[];
  area: string;
  floor: string;
  room: string;
  category: string;
  setFloor: (floor : string) => void;
  setRoom: (room : string) => void;
  setCategory: (category : string) => void;
  setArea: (area : string) => void;
};

export const useFloorsAndRoomsStore = create<State>(((set) => ({
  floors: [  
    'Basement',
    'First Floor',
    'Second Floor',
    'Attic',
  ],
  rooms: [   
    {name: 'Bathroom', floor: 'First Floor'},
    {name: 'Primary Bedroom', floor: 'First Floor'},
    {name: 'Kitchen', floor: 'First Floor'},
    {name: 'Kids Bedroom', floor: 'Second Floor'},
    {name: 'Guest Bedroom', floor: 'Second Floor'},
    {name: 'Bathroom', floor: 'Second Floor'},
    {name: 'Workshop', floor: 'Basement'},
    {name: 'Laundry Room', floor: 'Basement'},
    {name: 'Storage Room', floor: 'Basement'},
    {name: 'Storage Room', floor: 'Attic'},
],
  area: '',
  category: '',
  floor: '',
  room: '',
  setFloor: (floor: string) => set({ floor }),
  setRoom: (room: string) => set({ room }),
  setCategory: (category: string) => set({ category }),
  setArea: (area: string) => set({ area }),
})));