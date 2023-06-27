
import { StyleSheet, Text, View, Modal, Button, Dimensions, FlatList, TouchableOpacity, TextInput, StatusBar, Alert, ScrollView, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStore } from '../stateStores/DetailsStore';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Switch } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



const screenHeight = Dimensions.get('window').height;

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

const schema = yup.object().shape({

  categrory: yup.string().required(),
  subcategory: yup.string().required(),
  manufacturer: yup.string().required(),
  model: yup.string().required(),
  serialNumber: yup.string().required(),
  modelNumber: yup.string().required(),
  purchaseDate: yup.string().required(),
  underWarranty: yup.boolean().required(),
  warrantyExpirationDate: yup.string().required(),
  purchasedFrom: yup.string().required(),
  assignToFloor: yup.string().required(),
  assignToRoom: yup.string().required(),
});

const AddDetailsModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {

  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

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
  const [valueFloor, setValueFloor] = useState(null);
  const [valueRoom, setValueRoom] = useState(null);
  const [manufacturer, setManufacturer] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [model, setModel] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [floor, setFloor] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [room, setRoom] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  /// form 
  const { control, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

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
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
  
  >
    <View style={styles.modalContainer}>
      <View style={{ backgroundColor: 'white',borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 20, width: '100%', height: screenHeight * 0.9, zIndex: 2000, position: 'absolute', bottom: 0 }}>
        <View style={{flexDirection: "row", justifyContent: 'space-between',}}>
          <Text onPress={onClose}>X</Text>
          <Button title="Done" onPress={handleSubmit(onSubmit)} />
          {/* {formState.errors && <Text>This field is required</Text>} */}

        </View>
      
        <Text style={styles.categoriesText}>{detailsStore.selectedCategory?.label} {'>'} {detailsStore.selectedSubcategory?.label}</Text>
        <View style={{height: 1, width: 340,  backgroundColor: 'lightgrey', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}/>

        <ScrollView showsVerticalScrollIndicator={false}>
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
             <View style={{backgroundColor: 'lightgrey', width: 90, height: 100}}/>
             
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
            <View style={{backgroundColor: 'lightgrey', width: 90, height: 100}}/>
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
             <View style={{backgroundColor: 'lightgrey', width: 90, height: 100}}/>
           
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
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
               <DropDownPicker
                open={openManufacturer}
                value={valueManufacturer}
                items={manufacturer}
                setOpen={setOpenManufacturer}
                setValue={setValueManufacturer}
                setItems={setManufacturer}
                style={{borderRadius: 0}}
              />
              )}
              name="manufacturer"
            /> 
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
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
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
               <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
            <Switch style={{marginBottom: 10}} value={isSwitchOn} onValueChange={onToggleSwitch} />
            )}
            name="underWarranty"
            /> 
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
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{borderRadius: 0}}
          
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
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{borderRadius: 0}}
          
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
  },
  formText: {
    marginTop: 10,
    marginBottom: 20,
  }
})