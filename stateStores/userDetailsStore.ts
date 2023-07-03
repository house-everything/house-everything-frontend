import { create } from 'zustand'

interface userDetailsStore {
  username: string
  firstName: string
  lastName: string
  setFirstName: (FirstName: string) => void
  setSecondarySearchResult: (primarySearchResult: string) => void

}

const useUserDetailsStore = create<userDetailsStore>((set) => ({
  username: '',
  firstName: 'Adam',
  lastName: '',
  setFirstName(text: string) {
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

export default useUserDetailsStore