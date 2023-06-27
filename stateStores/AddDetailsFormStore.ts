import create from 'zustand';

type FormValues = {
  categrory: string;
  subcategory: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  modelNumber: string;
  purchaseDate: string;
  underWarranty: boolean;
  warrantyExpirationDate: string;
  purchasedFrom: string;
  assignToFloor: string;
  assignToRoom: string;
} 

const defaultValues: FormValues = {
  categrory: '',
  subcategory: '',
  manufacturer: '',
  model: '',
  serialNumber: '',
  modelNumber: '',
  purchaseDate: '',
  underWarranty: false,
  warrantyExpirationDate: '',
  purchasedFrom: '',
  assignToFloor: '',
  assignToRoom: '',
};

// Create Zustand store
const useStore = create((set) => ({
  formValues: defaultValues,
  setFormValues: (values: FormValues) => set({ formValues: values }),
}));
