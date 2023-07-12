
import { StyleSheet, Text, View, Modal, Button, Dimensions, FlatList, TouchableOpacity, TextInput, StatusBar, Alert, ScrollView, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStore } from '../stateStores/DetailsStore';
import { useFloorsAndRoomsStore, } from '../stateStores/ByRoomsAndFloorsStore';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Switch } from 'react-native-paper';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { SERVER_URL } from '@env';
import { FontAwesome } from '@expo/vector-icons';


const screenHeight = Dimensions.get('window').height;

type FormValues = {
  // categrory: string;
  // subcategory: string;
  // manufacturer: string;
  // model: string;
  serialNumber: string;
  modelNumber: string;
  purchaseDate: string;
  // // underWarranty: boolean;
  warrantyExpirationDate: string;
  purchasedFrom: string;
  assignToFloor: string;
  assignToRoom: string;
} 

const schema = yup.object().shape({

  // categrory: yup.string().required(),
  // subcategory: yup.string().required(),
  // manufacturer: yup.string().required(),
  // model: yup.string().required(),
  serialNumber: yup.string().required(),
  modelNumber: yup.string().required(),
  purchaseDate: yup.string().required(),
  // // underWarranty: yup.boolean().required(),
  warrantyExpirationDate: yup.string().required(),
  purchasedFrom: yup.string().required(),
  assignToFloor: yup.string(),
  assignToRoom: yup.string(),
});
// const defaultValues: FormValues = {
//   // categrory: '',
//   // subcategory: '',
//   // manufacturer: '',
//   // model: '',
//   serialNumber: '',
//   modelNumber: '',
//   purchaseDate: '',
//   underWarranty: false,
//   warrantyExpirationDate: '',
//   purchasedFrom: '',
//   assignToFloor: '',
//   assignToRoom: '',
// };
interface AddDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  filterProps: FilterProps;
}

interface FilterProps {
  floor?: string;
  room?: string;
  category?: string;
  subcategory?: string;
  objectType?: string;
}
const AddDetailsModal: React.FC<AddDetailsModalProps> = ({ visible, onClose, filterProps }) => {
  const { floor, room, category, subcategory } = filterProps;

  // Assuming there is a state for each filter prop to control the form inputs
  const [selectedFloor, setSelectedFloor] = useState(floor || "");
  const [selectedRoom, setSelectedRoom] = useState(room || "");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory || "");

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [openManufacturer, setOpenManufacturer] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [openFloor, setOpenFloor] = useState(false);
  const [openRoom, setOpenRoom] = useState(false);
  const [valueManufacturer, setValueManufacturer] = useState(null);
  const [valueModel, setValueModel] = useState(null);
  const [valueFloor, setValueFloor] = useState<any>();
  const [valueRoom, setValueRoom] = useState<any>();

  const [manufacturer, setManufacturer] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [model, setModel] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  ///these should be from the same list that the floor / room filter uses
  const floors = [
    'Basement',
    'First Floor',
    'Second Floor',
    'Attic',
    ]
  const [floorDropDown, setFloorDropDown] = useState(floors.map(floor => {
    return {label: floor.charAt(0).toUpperCase() + floor.slice(1), value: floor.toLowerCase()}
  }));

  const [roomDropDown, setRoomDropDown] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  const detailsStore = useStore(state => state);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const [actualImage, setActualImage] = useState<any>(null);
  const [labelImage, setLabelImage] = useState<any>(null);
  const [receiptImage, setReceiptImage] = useState<any>(null);

  const pickActualImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setActualImage(result.assets[0].uri);
    }
  };
  const pickLabelImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setLabelImage(result.assets[0].uri);
    }
  };

  const pickReceiptImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setReceiptImage(result.assets[0].uri);
    }
  };

  /// form 
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const dataValues = {
    category: filterProps.category,
    subcategory: filterProps.objectType,
    manufacturer: valueManufacturer,
    model: valueModel,
    floor: valueFloor,
    room: valueRoom,
    underWarranty: isSwitchOn
  }

  const onSubmit = (data: FormValues) => {
    // console.log({...data,...dropdownData});
    sendItemDetails({...data,...dataValues}, actualImage);  
  };

// const sendItemDetails = async (params:any) => {
//   console.log('params:',params)
//   try {
//     const response = await axios.post(SERVER_URL + '/add_items', {
//       params
//     });
//     console.log(response.data)
//   } catch (error) {
//     console.error(error);
// }
  
// }

const sendItemDetails = async (params:any, imageUri: string) => {
setLoading(true);
setSuccessModal(true);
  // console.log('params:',params)
  // if (imageUri !== null) {
  try {
    const formData = new FormData();

    if (imageUri !== null) {
    let uriParts = imageUri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    const file = {
      uri: imageUri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    } as any;

    formData.append('file', file);
  }

    // Append other fields to formData
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    const response = await axios.post(SERVER_URL + '/add_items', formData);
    
    setLoading(false);
    console.log(response.data)
  } catch (error) {
    console.error(error);
  }
}



  // if (permission?.status ! === ImagePicker.PermissionStatus.GRANTED) {
  //   Alert.alert('Permission not granted');
  //   return (
  //     <View style={{flex: 1}}>
  //        <Text>Permission Not Granted - {permission?.status}</Text>
  //       {/* <StatusBar  /> */}
  //       <Button title="Request Permission" onPress={requestPermission}></Button>  
  //     </View>
  //   )
  // }
   useEffect(() => {
    requestPermission();
     
    }, []);
    useEffect(() => {
      setValueFloor(filterProps.floor?.toString());
      setValueRoom(filterProps.room?.toString()); 
    }, [filterProps.floor])
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}

  >
      <Modal
        animationType="slide"
        transparent={true}
        visible={successModal}
      >
         <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{loading? 'Your form is being submitted' : 'Complete'}</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setSuccessModal(!successModal); onClose();}}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
   
    <View style={styles.modalContainer}>
      <View style={{ backgroundColor: 'white',borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20, width: '100%', height: screenHeight * 0.9, zIndex: 2000, position: 'absolute', bottom: 0 }}>
        <View style={{flexDirection: "row", justifyContent: 'space-between',}}>
          <Pressable onPress={onClose}>
          <Text >X</Text>
          </Pressable>
          <Button title="Done" onPress={handleSubmit(onSubmit) } />
          {/* {formState.errors && <Text>This field is required</Text>} */}
          {/* {formState.errors && <Text>This field is required</Text>} */}

        </View>
        <Text onPress={() => console.log(valueFloor)} style={styles.categoriesText}>{filterProps.category} {'>'} {filterProps.objectType}</Text>

        {/* <Text style={styles.categoriesText}>{detailsStore.selectedCategory?.label} {'>'} {detailsStore.selectedSubcategory?.label}</Text> */}
        <View style={{height: 1, width: 340,  backgroundColor: 'lightgrey', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}/>

        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
        {/* <Button title="Request Permission" onPress={requestPermission}></Button>  

        <Button title="Pick an image from camera roll" onPress={pickActualImage} />
        <View style={{flexDirection: 'row'}}> 
         
        </View> */}

        <Text style={{marginBottom: 10, fontSize: 16}}>Add/Replace Images</Text>
        {/* <Button title="Add Image" onPress={onClose} /> */}
      
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, paddingHorizontal: 10}}>
          <View >
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Actual Image</Text>
            {actualImage ?
              <Image source={{ uri: actualImage }} style={{ width: 90, height: 100 }} /> 
            : 
            <>
             <View style={{backgroundColor: 'lightgrey', width: 90, height: 100, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="photo" size={24} color="black" />
            </View>
             
             </>
            }
            <Pressable onPress={pickActualImage}>
             <View style={{backgroundColor: 'red', width: 20, height: 20, borderRadius: 50, marginLeft: 'auto', marginTop: -10, marginRight: -10, zIndex: 3000}}/>
             </Pressable>
          </View>

          <View>
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Product Label</Text>
            {labelImage ?
            <Image source={{ uri: labelImage }} style={{ width: 90, height: 100 }} />
            :
            <>
            <View style={{backgroundColor: 'lightgrey', width: 90, height: 100, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="photo" size={24} color="black" />
            </View>
            </>
          }
            <Pressable onPress={pickLabelImage}>
            <View style={{backgroundColor: 'red', width: 20, height: 20, borderRadius: 50, marginLeft: 'auto', marginTop: -10, marginRight: -10, zIndex: 3000}}/>
            </Pressable>
         </View>

          <View >
            <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Receipt</Text>
            {receiptImage ?
             <Image source={{ uri: receiptImage }} style={{ width: 90, height: 100 }} />
             :
             <>
            <View style={{backgroundColor: 'lightgrey', width: 90, height: 100, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="photo" size={24} color="black" />
            </View>
           
             </>
            }
              <Pressable onPress={pickReceiptImage}>
             <View style={{backgroundColor: 'red', width: 20, height: 20, borderRadius: 50, marginLeft: 'auto', marginTop: -10, marginRight: -10, zIndex: 3000}}/>
            </Pressable>
          </View>

        </View>

        <View style={{height: 1, width: 340,  backgroundColor: 'lightgrey', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}/>
        <View style={styles.formContainer}>
        {/* left row */}
          <View style={styles.formColumn}>
            <Text style={{marginBottom: 10, fontSize: 16}}>Manufacturer</Text>
            <View style={{ zIndex: 2000}}>
          
               <DropDownPicker
                open={openManufacturer}
                value={valueManufacturer}
                items={manufacturer}
                setOpen={setOpenManufacturer}
                setValue={setValueManufacturer}
                setItems={setManufacturer}
                style={{borderRadius: 0}}
              />
          
            {/* {errors.manufacturer && <Text>This field is required</Text>}  */}
            </View>
            <Text style={{marginBottom: 10, fontSize: 16, marginTop: 10}}>Serial #</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput value={value} onChangeText={onChange} placeholder="Serial Number" style={styles.input}/>
              )}
              name="serialNumber"
            />
    
            <Text style={styles.formText}>Purchase/Install Date</Text>
            <Text style={styles.formText}>Under Warranty</Text>
            <Text style={styles.formText}>Warranty Expiration Date</Text>
            <Text style={styles.formText}>Purchased From</Text>
          </View>

      {/* right row */}
         <View style={styles.formColumn}>
          <Text style={{marginBottom: 10, fontSize: 16}}>Model</Text>
            <View style={{ zIndex: 2000}}>
          
              <DropDownPicker
                open={openModel}
                value={value}
                items={model}
                setOpen={setOpenModel}
                setValue={setValueModel}
                setItems={setModel}
                style={{borderRadius: 0}}
              />
            
              </View>
               <Text style={{marginBottom: 10, fontSize: 16, marginTop: 10}}>Model #</Text>
              <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput value={value} onChangeText={onChange} placeholder="Model Number" style={styles.input}/>  
              )}
                name="modelNumber"
              /> 

                <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput value={value} onChangeText={onChange} placeholder="Purchase Date" style={styles.input}/>  
              )}
                name="purchaseDate"
              /> 
               {/* <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
            <Switch style={{marginBottom: 10}} value={isSwitchOn} onValueChange={onToggleSwitch} />
            )}
            name="underWarranty"
            />  */}
             <Switch style={{marginBottom: 10, marginLeft: 'auto'}} color='blue' value={isSwitchOn} onValueChange={onToggleSwitch} />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput value={value} onChangeText={onChange} placeholder="Expiration Date" style={styles.input}/>  
              )}
                name="warrantyExpirationDate"
              /> 
                <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput value={value} onChangeText={onChange} placeholder="Purchased From" style={styles.input}/>  
              )}
                name="purchasedFrom"
              /> 
          </View>

        </View>
        <View style={{height: 1, width: 340,  backgroundColor: 'lightgrey', marginLeft: 'auto', marginRight: 'auto'}}/>
      <View style={styles.formContainer}>
        <View style={styles.formColumn}>
          <Text style={{marginBottom: 10, fontSize: 16,}}> Assign to Floor</Text>
          <View style={{ zIndex: 2000}}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
               <DropDownPicker
                open={openFloor}
                value={valueFloor}
                items={floorDropDown}
                setOpen={setOpenFloor}
                setValue={setValueFloor}
                setItems={setFloorDropDown}
                style={{borderRadius: 0}}
                placeholder={valueFloor ? `${filterProps.floor?.toString() }` : 'Select Floor'}

          
              />
              )}
              name="assignToFloor"
            />
            </View>
        </View>
        <View style={styles.formColumn}>
        <Text style={{marginBottom: 10, fontSize: 16,}}> Assign to Room</Text>
        <View style={{ zIndex: 2000}}>
            <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
               <DropDownPicker
                open={openRoom}
                value={valueRoom}
                items={roomDropDown}
                setOpen={setOpenRoom}
                setValue={setValueRoom}
                setItems={setRoomDropDown}
                style={{borderRadius: 0}}
                placeholder={valueRoom ? `${filterProps.room?.toString() }` : 'Select Room'}
          
              />
              )}
              name="assignToRoom"
            />
                  

            </View>
            
        </View>
      </View>
      </ScrollView>
      </View>
    </View>
  </Modal>
  )
}

export default AddDetailsModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    // zIndex: 1000,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal : {
    backgroundColor: 'white', 
    padding: 20, 
    width: '100%', 
    height: screenHeight * 0.9, 
    zIndex: 2000, 
    position: 'absolute', 
    bottom: 0 ,
  },
  categoriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 0,
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formColumn: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10
  },
  formText: {
    marginTop: 10,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})