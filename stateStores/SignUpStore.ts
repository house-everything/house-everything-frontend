import { create } from 'zustand'

interface SignUpStore {
  primarySearchResult: string
  secondarySearchResult: string
  setPrimarySearchResult: (primarySearchResult: string) => void
  setSecondarySearchResult: (primarySearchResult: string) => void

}

const useSignUpStore = create<SignUpStore>((set) => ({
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

export default useSignUpStore