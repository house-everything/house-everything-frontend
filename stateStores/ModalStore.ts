import create from 'zustand';

interface Store {
  //...
  isCategoryModalOpen: boolean;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
  isDetailsModalOpen: boolean;
  openDetailsModal: () => void;
  closeDetailsModal: () => void;
}

export const useModalStore = create<Store>((set) => ({
  //...
  isCategoryModalOpen: false,
  openCategoryModal: () => set({ isCategoryModalOpen: true }),
  closeCategoryModal: () => set({ isCategoryModalOpen: false }),
  isDetailsModalOpen: false,
  openDetailsModal: () => set({ isDetailsModalOpen: true }),
  closeDetailsModal: () => set({ isDetailsModalOpen: false }),
}));