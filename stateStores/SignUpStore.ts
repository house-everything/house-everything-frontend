import { floor } from 'react-native-reanimated'
import { create } from 'zustand'

interface SignUpStore {
  authenticated: boolean
  floors: number
  beds: number
  baths: number
  currentOwner: boolean
  primaryResidence: boolean
  fullAddress: string
  firstName: string
  userImage: string
  propertyImage: string
  propertyName: string
  setPropertyName: (propertyName: string) => void
  setUserImage: (userImage: string) => void
  setPropertyImage: (propertyImage: string) => void
  setAuthenticated: (authenticated: boolean) => void
  setFirstName: (firstName: string) => void
  setFullAddress: (fullAddress: string) => void
  setCurrentOwner: (currentOwner: boolean) => void
  setPrimaryResidence: (primaryResidence: boolean) => void
  setFloors: (floors: number[]) => void
  setBeds: (beds: number[]) => void
  setBaths: (baths: number[]) => void
  primarySearchResult: string
  secondarySearchResult: string
  setPrimarySearchResult: (primarySearchResult: string) => void
  setSecondarySearchResult: (primarySearchResult: string) => void

}

const useSignUpStore = create<SignUpStore>((set) => ({
  authenticated: false,
  floors: 1,
  beds: 1,
  baths: 1,
  currentOwner: true,
  primaryResidence: true,
  fullAddress: '',
  primarySearchResult: '',
  secondarySearchResult: '',
  firstName: '',
  userImage: '',
  propertyImage: '',
  propertyName: '',
  setPropertyName(propertyName: string) {
    set((state) => ({
      ...state,
      propertyName: propertyName,
    }))
  },
  setUserImage(userImage: string) {
    set((state) => ({
      ...state,
      userImage: userImage,
    }))
  },
  setPropertyImage(propertyImage: string) {
    set((state) => ({
      ...state,
      propertyImage: propertyImage,
    }))
  },

  setAuthenticated: () => set({ authenticated: true }),
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
  setFloors(floors: number[]) { 

    set((state) => ({
      ...state,
      floors: floors[0],
    }))
  },
  setBeds(beds: number[]) {
  
    // let bedInt = parseInt(JSON.stringify(beds))
    // console.log('beds',typeof bedInt, beds[0])
    set((state) => ({
      ...state,
      beds: beds[0],
    }))
  },
  setBaths(baths: number[]) {
    
    // let bathInt = parseInt(JSON.stringify(baths))
    // console.log('baths ',typeof bathInt, bathInt, baths)
    set((state) => ({
      ...state,
      baths: baths[0],
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