import { create } from 'zustand'

interface SearchStore {
  primarySearchResult: string
  secondarySearchResult: string
  setPrimarySearchResult: (primarySearchResult: string) => void
  setSecondarySearchResult: (primarySearchResult: string) => void

}

const useSearchStore = create<SearchStore>((set) => ({
  primarySearchResult: '',
  secondarySearchResult: '',
  setPrimarySearchResult(text: string) {
    set((state) => ({
      ...state,
      primarySearchResult: text,
    }))
  },
  setSecondarySearchResult(text: string) {
    set((state) => ({
      ...state,
      secondarySearchResult: text,
    }))
  },
}))

export default useSearchStore