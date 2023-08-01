import { Image, Pressable, ScrollView, StyleSheet, Text, View, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useSignUpStore from '../../stateStores/SignUpStore';
import Checkbox from 'expo-checkbox';
import { TextInput as TextInputMUI } from "@react-native-material/core";
import { useFonts } from "expo-font";
import FontPath from '../../assets/fonts/FontPath';
// import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';
import * as ImagePicker from 'expo-image-picker';
import Button1 from '../../components/Button1';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';


const PropertySetup = () => {

  const store = useSignUpStore();
  const [appIsReady, setAppIsReady] = useState(false);
  const [propertyImage, setPropertyImage] = useState<any>(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [step, setStep] = useState(1);
  const [floorSliderValue, setFloorSliderValue] = useState<number>(store.floors);
  const [bedSliderValue, setBedSliderValue] = useState(store.beds);
  const [bathSliderValue, setBathSliderValue] = useState(store.baths);
  const [floors, setFloors] = useState(Array(floorSliderValue).fill({ floorNumber: 0, floorName: '' }));
  const [livingRooms, setLivingRooms] = useState(0);
  const [kitchens, setKitchens] = useState(0);
  const [familyRooms, setFamilyRooms] = useState(0);
  const [laundryRooms, setLaundryRooms] = useState(0);
  const [foyerEntrance, setFoyerEntrance] = useState(0);

  ////
  const [roomNames, setRoomNames] = useState(Array(bedSliderValue).fill(''));
  // const [open, setOpen] = useState(Array(bedSliderValue).fill(false));
  const [values, setValues] = useState(Array(bedSliderValue).fill(''));

  ////

  /// step 4 
  interface RoomDetails {
    roomName: string;
    floorName: string | null;
    roomNumber: string;
  }

  // from step 3, the slider values are then ran through this function to create an array of objects
  // of room details
  // every room type will have its seperate state but with the same object structure
  // once the form is submitted the seperate arrays will be joined together and sent to the server
  // as the rooms array

// bedroom
  const initialBedroomDetails: RoomDetails[] = new Array(bedSliderValue).fill(null).map((_, index) => ({
    roomName: '',
    floorName: null,
    roomNumber: `bed${index}`
  }));

  const [bedroomDetails, setBedroomDetails] = useState<RoomDetails[]>(initialBedroomDetails);

  const [open, setOpen] = useState(Array(bedroomDetails.length).fill(false));

// bathroom
  const initialBathDetails: RoomDetails[] = new Array(bathSliderValue).fill(null).map((_, index) => ({
    roomName: '',
    floorName: null,
    roomNumber: `bath${index}`
  }));

  const [bathDetails, setBathDetails] = useState<RoomDetails[]>(initialBathDetails);

  const [openBath, setBathOpen] = useState(Array(bathDetails.length).fill(false));

// living rooms

const initialLivingroomDetails: RoomDetails[] = new Array(laundryRooms).fill(null).map((_, index) => ({
  roomName: '',
  floorName: null,
  roomNumber: `livingroom${index}`
}));

const [livingroomDetails, setLivingroomDetails] = useState<RoomDetails[]>(initialLivingroomDetails);

const [openLivingroom, setLivingroomOpen] = useState(Array(livingroomDetails.length).fill(false));

// kitchens

const initialKitchenDetails: RoomDetails[] = new Array(kitchens).fill(null).map((_, index) => ({
  roomName: '',
  floorName: null,
  roomNumber: `kitchen${index}`
}));

const [kitchenDetails, setKitchenDetails] = useState<RoomDetails[]>(initialKitchenDetails);
const [openKitchen, setKitchenOpen] = useState(Array(kitchenDetails.length).fill(false));

// family rooms
const initialFamilyroomDetails: RoomDetails[] = new Array(familyRooms).fill(null).map((_, index) => ({
  roomName: '',
  floorName: null,
  roomNumber: `familyroom${index}`
}));

const [familyroomDetails, setFamilyroomDetails] = useState<RoomDetails[]>(initialFamilyroomDetails);
const [openFamilyroom, setFamilyroomOpen] = useState(Array(familyroomDetails.length).fill(false));


// laundry rooms
const initialLaundryroomDetails: RoomDetails[] = new Array(laundryRooms).fill(null).map((_, index) => ({
  roomName: '',
  floorName: null,
  roomNumber: `laundryroom${index}`
}));

const [laundryroomDetails, setLaundryroomDetails] = useState<RoomDetails[]>(initialLaundryroomDetails);
const [openLaundryroom, setLaundryroomOpen] = useState(Array(laundryroomDetails.length).fill(false));

// foyer entrance
const initialFoyerentranceDetails: RoomDetails[] = new Array(foyerEntrance).fill(null).map((_, index) => ({
  roomName: '',
  floorName: null,
  roomNumber: `foyerentrance${index}`
}));

const [foyerentranceDetails, setFoyerentranceDetails] = useState<RoomDetails[]>(initialFoyerentranceDetails);
const [openFoyerentrance, setFoyerentranceOpen] = useState(Array(foyerentranceDetails.length).fill(false));


  const handleNameChange = (index: number, text: string) => {
    let newRoomDetails = [...bedroomDetails];
    newRoomDetails[index].roomName = text;
    setBedroomDetails(newRoomDetails);
  };
  
  const handleFloorChange = (index: number, value: string): void => {
    console.log(index, value)
    let newRoomDetails = [...bedroomDetails];
    newRoomDetails[index].floorName = value;
    setBedroomDetails(newRoomDetails);
  };

  const handleNameChangeBath = (index: number, text: string) => {
    let newRoomDetails = [...bathDetails];
    newRoomDetails[index].roomName = text;
    setBathDetails(newRoomDetails);
  };
  
  const handleFloorChangeBath = (index: number, value: string): void => {
    console.log(index, value)
    let newBathDetails = [...bathDetails];
    newBathDetails[index].floorName = value;
    setBathDetails(newBathDetails);
  };

  const handleNameChangeLivingroom = (index: number, text: string) => {
    let newRoomDetails = [...livingroomDetails];
    newRoomDetails[index].roomName = text;
    setLivingroomDetails(newRoomDetails);
  };

  const handleFloorChangeLivingroom = (index: number, value: string): void => {
    console.log(index, value)
    let newRoomDetails = [...livingroomDetails];
    newRoomDetails[index].floorName = value;
    setLivingroomDetails(newRoomDetails);
  };

  const handleNameChangeKitchen = (index: number, text: string) => {
    let newRoomDetails = [...kitchenDetails];
    newRoomDetails[index].roomName = text;
    setKitchenDetails(newRoomDetails);
  };

  const handleFloorChangeKitchen = (index: number, value: string): void => {
    console.log(index, value)
    let newRoomDetails = [...kitchenDetails];
    newRoomDetails[index].floorName = value;
    setKitchenDetails(newRoomDetails);
  };

  const handleNameChangeFamilyroom = (index: number, text: string) => {
    let newRoomDetails = [...familyroomDetails];
    newRoomDetails[index].roomName = text;
    setFamilyroomDetails(newRoomDetails);
  };

  const handleFloorChangeFamilyroom = (index: number, value: string): void => {
    console.log(index, value)
    let newRoomDetails = [...familyroomDetails];
    newRoomDetails[index].floorName = value;
    setFamilyroomDetails(newRoomDetails);
  };

  const handleNameChangeLaundryroom = (index: number, text: string) => {
    let newRoomDetails = [...laundryroomDetails];
    newRoomDetails[index].roomName = text;
    setLaundryroomDetails(newRoomDetails);
  };

  const handleFloorChangeLaundryroom = (index: number, value: string): void => {
    console.log(index, value)
    let newRoomDetails = [...laundryroomDetails];
    newRoomDetails[index].floorName = value;
    setLaundryroomDetails(newRoomDetails);
  };

  const handleNameChangeFoyerentrance = (index: number, text: string) => {
    let newRoomDetails = [...foyerentranceDetails];
    newRoomDetails[index].roomName = text;
    setFoyerentranceDetails(newRoomDetails);
  };

  const handleFloorChangeFoyerentrance = (index: number, value: string): void => {
    console.log(index, value)
    let newRoomDetails = [...foyerentranceDetails];
    newRoomDetails[index].floorName = value;
    setFoyerentranceDetails(newRoomDetails);
  };



  // const handleFloorChange = (selectedValue: any): void => {
  //   // console.log( selectedValue)
  //   // let newRoomDetails = [...bedroomDetails];
  //   // newRoomDetails[index].floorName = value;
  //   // setBedroomDetails(newRoomDetails);
  // };
  const [testDropdownValues, setTestDropdownValues] = useState([
    {label: 'Level 1', value: 'Level 1'},
    {label: 'Level 2', value: 'Level 2'},
    {label: 'Level 3', value: 'Level 3'},
  ])
  
  const [selectedLanguage, setSelectedLanguage] = useState();

  
  
  

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

 
  const pickPropertyImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPropertyImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    requestPermission();
     
    }, []);
    const { control, handleSubmit, formState: { errors } } = useForm({
      
    });
    useEffect(() => {
      const newFloors = Array.from({ length: floorSliderValue }, (_, index) => ({ floorNumber: index + 1, floorName: '' }));
      setFloors(newFloors);
    }, [floorSliderValue]);


    const floorsDropdownOptions = floors.map((floor, index) => ({ label: floor.floorName, value: floor.floorNumber }));
  const [loadedFonts] = useFonts({
    Bold: require("../../assets/fonts/Roboto-Bold.ttf"),
    Regular: require("../../assets/fonts/Roboto-Regular.ttf"),
    Medium: require('../../assets/fonts/Roboto-Medium.ttf')
  });
  if (!loadedFonts) {
    return <View/>;
  }

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // } 

  const PrintIndex = (index: any) => {  
    console.log(index);
  }

  const handleInputChangeRooms = (index: any, event: any) => {
    const newRoomNames = [...roomNames];
    newRoomNames[index] = event.target.value;
    setRoomNames(newRoomNames);
  }
  const handleInputChange = (index:any, event: any) => {
    // console.log(index, event.nativeEvent.text);
    const newFloors = [...floors];
    newFloors[index].floorName = event.nativeEvent.text;
    setFloors(newFloors);
  };
 
 
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={{fontFamily: 'Medium', fontSize:18, marginBottom: 10}}>Welcome Adam {store.firstName}</Text>
        {propertyImage? 
        <Image source={{ uri: propertyImage }} style={{ width: 90, height: 90, borderRadius: 50, marginBottom: 10 }} />
        :
        <View style={{width: 80, height: 80, borderRadius: 50, backgroundColor: '#711e68', marginBottom: 10}}></View>
        }
       
        <Text style={styles.text}>{store.fullAddress}</Text>
      </View>
      
      
       
       
 { step === 1 ? (
      <>
      {/* <Button1 title="Print" onPress={() => console.log(floors)} /> */}
           <View style={{width: '100%',  backgroundColor: '#d1d1d1'}}>
            <Text style={styles.mediumText}>Set-up Property Profile</Text>
           </View>
           <ScrollView style={styles.lowerContainer}>
      <View style={{flexDirection:'row', alignItems: 'center',marginBottom: 20 }}>
          <Text 
          style={styles.text}
          >Name Property </Text>
          <TextInputMUI variant="outlined" label="Property Name" style={{  width: 150, marginLeft: 'auto' }} />
        </View>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style={styles.text}>Add/Change Property Image </Text>
          <Pressable style={{marginLeft: 'auto'}} onPress={pickPropertyImage}>
            <MaterialCommunityIcons name="camera-plus" size={24} color="black" />
          </Pressable>
        </View>
    
        <Button1 title="Continue" onPress={nextStep} />
        </ScrollView>
  </>
  ) : step === 2 ? (
   
    <>
        <View style={{width: '100%', backgroundColor: '#d1d1d1'}}>
            <Text style={styles.mediumText}>Tell us about the floor layout</Text>
           </View>
           <ScrollView style={styles.lowerContainer}>
      <Pressable onPress={prevStep}>
      <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
      </Pressable>

      <Text style={[styles.text, {lineHeight: 23, marginBottom: 10}]}>
        How many floors does this property have including basements, crawl spaces and attics?
      </Text>
      
      <View style={{flexDirection: 'row', alignItems:'center'}}>
      <MaterialCommunityIcons name="layers-plus" size={24} color="black" />
        <Text style={[styles.text, {marginLeft: 15}]}>Floors/levels </Text>
      <Slider
        style={{width: 160, height: 40, marginLeft:'auto', marginRight: 15}}
        minimumValue={1}
        maximumValue={10}
        minimumTrackTintColor="#d1d1d1"
        maximumTrackTintColor="#6e869d"
        thumbTintColor="#711e68"
        value={floorSliderValue}
        onValueChange={setFloorSliderValue}
        step={1}
      />
       <Text>{floorSliderValue}</Text>
      </View>
      <View style={{height: 2, backgroundColor: '#d1d1d1', marginVertical: 10}}/>
      <Text style={[styles.text, {marginBottom: 15}]}>Name Each Floor</Text>

   {Array.from({length: floorSliderValue}, (_, index) => (
    
      <>
      <Text style={styles.row}>{`Level ${index + 1}`}</Text>
      <TextInputMUI 
        key={index}
        placeholder={`Level ${index + 1}`}
        variant='outlined' 
        style={{marginBottom: 10, width: 180,}} 
        inputContainerStyle={{height: 50,  }}
        inputStyle={{paddingBottom: 5, fontSize: 18}}
        onChange={(event) => handleInputChange(`${index}`, event)}
      />
      
      </>
      )
      )
      }
          {/* <Button1 title="Print" onPress={() => console.log(floors)} /> */}

    <Button1 title="Next" onPress={nextStep} />
    <View style={{marginBottom: 100}}/>
    </ScrollView>
  </>
  ) : step === 3 ? (
    <>
        <View style={{width: '100%', backgroundColor: '#d1d1d1'}}>
          <Text style={styles.mediumText}>Tell us about the rooms & areas</Text>
        </View>
            <ScrollView style={styles.lowerContainer}>
      <Pressable onPress={prevStep}>
       <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
      </Pressable>
       <View style={styles.row}>
        <Text style={styles.text}>Bedrooms</Text>
        <Slider
          style={{width: 180, height: 40, marginLeft:'auto', marginRight: 15}}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#d1d1d1"
          maximumTrackTintColor="#6e869d"
          thumbTintColor="#711e68"
          onValueChange={setBedSliderValue}
          value={bedSliderValue}
          step={1}
        />
        <Text>{bedSliderValue}</Text>
       </View>
       
       <View style={{height: 2, backgroundColor: '#d1d1d1', width: '100%', marginRight: -20, marginVertical: 10}}/>
     
       <View style={styles.row}>
        <Text style={styles.text}>Bathrooms</Text>
        <Slider
          style={{width: 180, height: 40, marginLeft:'auto', marginRight: 15}}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#d1d1d1"
          maximumTrackTintColor="#6e869d"
          thumbTintColor="#711e68"
          onValueChange={setBathSliderValue}
          value={bathSliderValue}
          step={1}
        />
        <Text>{bathSliderValue}</Text>
       </View>

       <View style={{height: 2, backgroundColor: '#d1d1d1', width: '100%', marginRight: -20, marginVertical: 10}}/>

       <View style={styles.row}>
        <Text style={styles.text}>Living Rooms</Text>
        <Slider
          style={{width: 180, height: 40, marginLeft:'auto', marginRight: 15}}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#d1d1d1"
          maximumTrackTintColor="#6e869d"
          thumbTintColor="#711e68"
          onValueChange={setLivingRooms}
          value={livingRooms}
          step={1}
        />
        <Text>{livingRooms}</Text>
       </View>

       <View style={{height: 2, backgroundColor: '#d1d1d1', width: '100%', marginRight: -20, marginVertical: 10}}/>
       
       <View style={styles.row}>
        <Text style={styles.text}>Foyer/Entrance</Text>
        <Slider
          style={{width: 180, height: 40, marginLeft:'auto', marginRight: 15}}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#d1d1d1"
          maximumTrackTintColor="#6e869d"
          thumbTintColor="#711e68"
          onValueChange={setFoyerEntrance}
          value={foyerEntrance}
          step={1}
        />
        <Text>{foyerEntrance}</Text>
       </View>

       <View style={{height: 2, backgroundColor: '#d1d1d1', width: '100%', marginRight: -20, marginVertical: 10}}/>

       <View style={styles.row}>
        <Text style={styles.text}>Kitchens</Text>
        <Slider
          style={{width: 180, height: 40, marginLeft:'auto', marginRight: 15}}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#d1d1d1"
          maximumTrackTintColor="#6e869d"
          thumbTintColor="#711e68"
          onValueChange={setKitchens}
          value={kitchens}
          step={1}
        />
        <Text>{kitchens}</Text>
       </View>

       <View style={{height: 2, backgroundColor: '#d1d1d1', width: '100%', marginRight: -20, marginVertical: 10}}/>

      <View style={styles.row}>
      <Text style={styles.text}>Family Room</Text>
      <Slider
        style={{width: 180, height: 40, marginLeft:'auto', marginRight: 15}}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="#d1d1d1"
        maximumTrackTintColor="#6e869d"
        thumbTintColor="#711e68"
        onValueChange={setFamilyRooms}
        value={familyRooms}
        step={1}
      />
      <Text>{familyRooms}</Text>
      </View>

      <View style={{height: 2, backgroundColor: '#d1d1d1', width: '100%', marginRight: -20, marginVertical: 10}}/>

      <View style={styles.row}>
      <Text style={styles.text}>Laundry Room</Text>
      <Slider
        style={{width: 180, height: 40, marginLeft:'auto', marginRight: 15}}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="#d1d1d1"
        maximumTrackTintColor="#6e869d"
        thumbTintColor="#711e68"
        onValueChange={setLaundryRooms}
        value={laundryRooms}
        step={1}
      />
      <Text>{laundryRooms}</Text>
      </View>

    <Button1 title="Next" onPress={nextStep} />
    <View style={{marginBottom: 100}}/>

    </ScrollView>
  </>
  ) : (
    <>

     <View style={{width: '100%', backgroundColor: '#d1d1d1', zIndex: 1000}}>
       <Text style={styles.mediumText}>Name the rooms & assign them to floors</Text>
     </View>
     <Button1 title="Print" onPress={() => console.log(bedroomDetails, bathDetails)} />
    <ScrollView nestedScrollEnabled={true} style={{padding: 20}}>
      <Pressable onPress={prevStep} style={{width: 30, height:30}}>
       <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
      </Pressable>
  {bedroomDetails.map((room, index) => (
  <View style={[styles.row, { justifyContent: 'space-between',  }]} key={index}>
    <TextInputMUI
     variant='outlined' 
      placeholder={`Bedroom ${index + 1}`}
      inputContainerStyle={{height: 50,  }}
      inputStyle={{paddingBottom: 5, fontSize: 18}}
      style={{marginBottom: 10, width: 150,}} 
      onChangeText={(text) => handleNameChange(index, text)}
    />

  {/* <Text onPress={()=> console.log(bedroomDetails[index].floorName)}>{20 - index}</Text> */}
 
  <View style={styles.dropdownContainer}>
  <DropDownPicker
    style={{width: 150, borderRadius: 0, zIndex: open[index]? 300 : 0,}}
    dropDownDirection="TOP"
    dropDownContainerStyle={{ elevation: open[index]? 300 : 0, width: 150 }}
    items={testDropdownValues}
    setItems={setTestDropdownValues}
    setValue={() => handleFloorChange}
    onSelectItem={(item) => {
      handleFloorChange(index, `${item.value}`);
    }}
    onChangeValue={(value) => {
      console.log(value);
    }}
    value={room.floorName}
    // setValue={() => handleFloorChange(index, `${bedroomDetails[index].floorName}`) }
    open={open[index]}
    setOpen={(isOpen: any) => {
      let newOpen = [...open];
      newOpen[index] = isOpen;
      setOpen(newOpen);
    }}
/>
 
</View>

  
  </View>
))}

{/* BATHROOM */}
  {bathDetails.map((room, index) => (
    <View style={[styles.row, { justifyContent: 'space-between',  }]} key={index}>
      <TextInputMUI
      variant='outlined' 
        placeholder={`Bathroom ${index + 1} `}
        inputContainerStyle={{height: 50,  }}
        inputStyle={{paddingBottom: 5, fontSize: 18}}
        style={{marginBottom: 10, width: 150,}} 
        onChangeText={(text) => handleNameChangeBath(index, text)}
      />
  
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        style={{width: 150, borderRadius: 0, zIndex: openBath[index]? 300 : 0,}}
        dropDownDirection="TOP"
        dropDownContainerStyle={{ elevation: openBath[index]? 300 : 0, width: 150 }}
        items={testDropdownValues}
        setItems={setTestDropdownValues}
        setValue={() => handleFloorChangeBath}
        onSelectItem={(item) => {
          handleFloorChangeBath(index, `${item.value}`);
        }}
        onChangeValue={(value) => {
          console.log(value);
        }}
        value={room.floorName}
        open={openBath[index]}
        setOpen={(isOpen: any) => {
          let newOpen = [...openBath];
          newOpen[index] = isOpen;
          setBathOpen(newOpen);
        }}
      />
    </View>
  </View>
  ))}

{/* LIVING ROOM */}
{livingroomDetails.map((room, index) => (
    <View style={[styles.row, { justifyContent: 'space-between',  }]} key={index}>
      <TextInputMUI
      variant='outlined' 
        placeholder={`Livingroom ${index + 1} `}
        inputContainerStyle={{height: 50,  }}
        inputStyle={{paddingBottom: 5, fontSize: 18}}
        style={{marginBottom: 10, width: 150,}} 
        onChangeText={(text) => handleNameChangeLivingroom(index, text)}
      />
  
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        style={{width: 150, borderRadius: 0, zIndex: openLivingroom[index]? 300 : 0,}}
        dropDownDirection="TOP"
        dropDownContainerStyle={{ elevation: openLivingroom[index]? 300 : 0, width: 150 }}
        items={testDropdownValues}
        setItems={setTestDropdownValues}
        setValue={() => handleFloorChangeLivingroom}
        onSelectItem={(item) => {
          handleFloorChangeLivingroom(index, `${item.value}`);
        }}
        onChangeValue={(value) => {
          console.log(value);
        }}
        value={room.floorName}
        open={openLivingroom[index]}
        setOpen={(isOpen: any) => {
          let newOpen = [...openLivingroom];
          newOpen[index] = isOpen;
          setLivingroomOpen(newOpen);
        }}
      />
    </View>
  </View>
  ))}

{/* KITCHEN */}
{kitchenDetails.map((room, index) => (
    <View style={[styles.row, { justifyContent: 'space-between',  }]} key={index}>
      <TextInputMUI
        variant='outlined' 
        placeholder={`Kitchen ${index + 1} `}
        inputContainerStyle={{height: 50,  }}
        inputStyle={{paddingBottom: 5, fontSize: 18}}
        style={{marginBottom: 10, width: 150,}} 
        onChangeText={(text) => handleNameChangeKitchen(index, text)}
      />
  
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        style={{width: 150, borderRadius: 0, zIndex: openKitchen[index]? 300 : 0,}}
        dropDownDirection="TOP"
        dropDownContainerStyle={{ elevation: openKitchen[index]? 300 : 0, width: 150 }}
        items={testDropdownValues}
        setItems={setTestDropdownValues}
        setValue={() => handleFloorChangeKitchen}
        onSelectItem={(item) => {
          handleFloorChangeKitchen(index, `${item.value}`);
        }}
        onChangeValue={(value) => {
          console.log(value);
        }}
        value={room.floorName}
        open={openKitchen[index]}
        setOpen={(isOpen: any) => {
          let newOpen = [...openKitchen];
          newOpen[index] = isOpen;
          setKitchenOpen(newOpen);
        }}
      />
    </View>
  </View>
  ))}

{/* FAMILY ROOM */}
{familyroomDetails.map((room, index) => (
    <View style={[styles.row, { justifyContent: 'space-between',  }]} key={index}>
      <TextInputMUI
      variant='outlined' 
        placeholder={`Familyroom ${index + 1} `}
        inputContainerStyle={{height: 50,  }}
        inputStyle={{paddingBottom: 5, fontSize: 18}}
        style={{marginBottom: 10, width: 150,}} 
        onChangeText={(text) => handleNameChangeBath(index, text)}
      />
  
    <View style={styles.dropdownContainer}>
      <DropDownPicker
        style={{width: 150, borderRadius: 0, zIndex: openBath[index]? 300 : 0,}}
        dropDownDirection="TOP"
        dropDownContainerStyle={{ elevation: openBath[index]? 300 : 0, width: 150 }}
        items={testDropdownValues}
        setItems={setTestDropdownValues}
        setValue={() => handleFloorChangeBath}
        onSelectItem={(item) => {
          handleFloorChangeBath(index, `${item.value}`);
        }}
        onChangeValue={(value) => {
          console.log(value);
        }}
        value={room.floorName}
        open={openBath[index]}
        setOpen={(isOpen: any) => {
          let newOpen = [...openBath];
          newOpen[index] = isOpen;
          setBathOpen(newOpen);
        }}
      />
    </View>
  </View>
  ))}

{/* LAUNDRY ROOM */}

    {/* <View style={{width: 150,}}>  
    <Picker
    // selectedValue={bedroomDetails[index].floorName}
    onValueChange={(value:any) => handleFloorChange(index, value)
    }>
      {testDropdownValues.map((floor, index) => ( 
      <Picker.Item label={floor.label} value={floor.value} key={index} />
      ))
      }
  </Picker>
  </View> */}
        {/* {Array.from({length: bedSliderValue}, (_, index) =>  { 
          return (
        <>
         <View style={styles.row}>
        <Text>{`Bed Room ${index + 1}`}</Text>
        <View >
        <TextInputMUI 
          key={index}
          variant='outlined' 
          style={{marginBottom: 10, width: 180,}} 
          inputContainerStyle={{height: 50,  }}
          inputStyle={{paddingBottom: 5, fontSize: 18}}
          
          onChange={(event) => handleInputChangeRooms(`${index}`, event)}
        />
        </View>
        <DropDownPicker
                open={open[index]}
                value={values[index]}}
                items={floorsDropdownOptions}
                // // setOpen={(isOpen) => {
                // //   const newOpen = [...open];
                // //   newOpen[index] = isOpen;
                // //   setOpen(newOpen);
                // // }}
                // setValue={(value:any )=> {
                //   const newValues = [...values];
                //   newValues[index] = value;
                //   setValues(newValues);
                // }}
                // setItems={handleInputChange}
                // style={{borderRadius: 0}}
              />
        </View>
        </>
        )}
        )
        } */}

  
    <Text>Step 4</Text>
    <Button1 title="Next" onPress={nextStep} />
    </ScrollView>
  </>
  )}
      {/* </ScrollView> */}
     
    </View>
  )
}

export default PropertySetup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upperContainer: {
  height: 200,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  },
  lowerContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    zIndex: 4000,
    padding: 20,
  },
  text: {
    fontFamily: 'Regular',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mediumText: {
    fontFamily: 'Medium',
    fontSize: 16, 
    padding: 8
  },
  dropdownContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent:'space-between',
    // width: 200,
    // zIndex: 300,
    marginBottom: 15,
  },
})