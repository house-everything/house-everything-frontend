import { create } from 'zustand'

interface SignUpStore {
  floors: number
  beds: number
  baths: number
  currentOwner: boolean
  primaryResidence: boolean
  fullAddress: string
  firstName: string
  setFirstName: (firstName: string) => void
  setFullAddress: (fullAddress: string) => void
  setCurrentOwner: (currentOwner: boolean) => void
  setPrimaryResidence: (primaryResidence: boolean) => void
  setFloors: (floors: number) => void
  setBeds: (beds: number) => void
  setBaths: (baths: number) => void
  primarySearchResult: string
  secondarySearchResult: string
  setPrimarySearchResult: (primarySearchResult: string) => void
  setSecondarySearchResult: (primarySearchResult: string) => void

}

const useSignUpStore = create<SignUpStore>((set) => ({
  floors: 5,
  beds: 3,
  baths: 2,
  currentOwner: true,
  primaryResidence: true,
  fullAddress: '',
  primarySearchResult: '',
  secondarySearchResult: '',
  firstName: '',
  setFirstName(firstName: string) {
    set((state) => ({
      ...state,
      firstName: firstName,
    }))
  },
  setFullAddress(fullAddress: string) {
    set((state) => ({
      ...state,
      fullAddress: fullAddress,
    }))
  },
  setCurrentOwner(currentOwner: boolean) {
    set((state) => ({
      ...state,
      currentOwner: currentOwner,
    }))
  },
  setPrimaryResidence(primaryResidence: boolean) {
    set((state) => ({
      ...state,
      primaryResidence: primaryResidence,
    }))
  },
  setFloors(floors: number) { 
    set((state) => ({
      ...state,
      floors: floors,
    }))
  },
  setBeds(beds: number) {
    set((state) => ({
      ...state,
      beds: beds,
    }))
  },
  setBaths(baths: number) {
    set((state) => ({
      ...state,
      baths: baths,
    }))
  },
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