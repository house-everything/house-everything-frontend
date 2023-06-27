
import { StyleSheet, Text, View, Modal, Button, Dimensions, FlatList, TouchableOpacity, TextInput, StatusBar, Alert, ScrollView, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useStore } from '../stateStores/DetailsStore';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Switch } from 'react-native-paper';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';



const screenHeight = Dimensions.get('window').height;


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
    let result = await ImagePicker.launchImageLibraryAsync({
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
      <View style={{ backgroundColor: 'white', padding: 20, width: '100%', height: screenHeight * 0.9, zIndex: 2000, position: 'absolute', bottom: 0 }}>
        <View style={{flexDirection: "row", justifyContent: 'space-between',}}>
          <Text onPress={onClose}>X</Text>
          <Button title="Done" onPress={onClose} />

        </View>
      
        <Text style={styles.categoriesText}>{detailsStore.selectedCategory?.label} {'>'} {detailsStore.selectedSubcategory?.label}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Button title="Request Permission" onPress={requestPermission}></Button>  

        <Button title="Pick an image from camera roll" onPress={pickActualImage} />
        <View style={{flexDirection: 'row'}}> 
         
        </View> */}

        {/* <Text>Add/Replace Images</Text> */}
        {/* <Button title="Add Image" onPress={onClose} /> */}
      
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, paddingHorizontal: 10}}>
          <View >
            <Text>Actual Image</Text>
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
            <Text>Product Label</Text>
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
            <Text>Receipt</Text>
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
            <Text>Manufacturer</Text>
            <View style={{ zIndex: 2000}}>
               <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
         
          
              />
            </View>
            <Text>Serial #</Text>
            <TextInput style={styles.input}/>
            <Text style={styles.formText}>Purchase/Install Date</Text>
            <Text style={styles.formText}>Under Warranty</Text>
            <Text style={styles.formText}>Warranty Expiration Date</Text>
            <Text style={styles.formText}>Purchased From</Text>
          </View>

      {/* right row */}
         <View style={styles.formColumn}>
          <Text>Model</Text>
            <View>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
              </View>
               <Text>Model #</Text>
            <TextInput style={styles.input}/>        
            <TextInput style={styles.input}/>
            <Switch style={{marginBottom: 10}} value={isSwitchOn} onValueChange={onToggleSwitch} />
            <TextInput style={styles.input}/>
            <TextInput style={styles.input}/>
          </View>

        </View>
        <View style={{height: 1, width: 340,  backgroundColor: 'lightgrey', marginLeft: 'auto', marginRight: 'auto'}}/>
      <View style={styles.formContainer}>
        <View style={styles.formColumn}>
          <Text> Assign to Floor</Text>
          <TextInput style={styles.input}/>
        </View>
        <View style={styles.formColumn}>
        <Text> Assign to Room</Text>
          <TextInput style={styles.input}/>
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