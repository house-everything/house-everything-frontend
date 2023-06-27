import create from 'zustand';

interface Item {
  id: string;
  label: string;
}

interface Subcategory extends Item {
  items: Item[];
}

export interface Category extends Item {
  subcategories: Subcategory[];
}

interface Store {
  navLevel: 'categories' | 'subcategories' | 'items';
  selectedCategory: Category | null;
  selectedSubcategory: Subcategory | null;
  navigate: (item: Category | Subcategory | Item) => void;
  goBack: () => void;
}

export const useStore = create<Store>((set) => ({
  navLevel: 'categories',
  selectedCategory: null,
  selectedSubcategory: null,
  navigate: (item) => {
    set((state) => {
      if (state.navLevel === 'categories') {
        return { navLevel: 'subcategories', selectedCategory: item as Category };
      } else if (state.navLevel === 'subcategories') {
        return { navLevel: 'items', selectedSubcategory: item as Subcategory };
      } else {
        return state;
      }
    });
  },
  goBack: () => {
    set((state) => {
      if (state.navLevel === 'items') {
        return { navLevel: 'subcategories', selectedSubcategory: null };
      } else if (state.navLevel === 'subcategories') {
        return { navLevel: 'categories', selectedCategory: null };
      } else {
        return state;
      }
    });
  },
}));