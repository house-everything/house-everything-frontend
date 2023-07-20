import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
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

SplashScreen.preventAutoHideAsync();

const PropertySetup = () => {

  const store = useSignUpStore();
  const [appIsReady, setAppIsReady] = useState(false);
  const [propertyImage, setPropertyImage] = useState<any>(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [step, setStep] = useState(1);
  const [floorSliderValue, setFloorSliderValue] = useState(store.floors);
  const [bedSliderValue, setBedSliderValue] = useState(store.beds);
  const [bathSliderValue, setBathSliderValue] = useState(store.baths);
  const [floors, setFloors] = useState(Array(floorSliderValue).fill({ floorNumber: 0, floorName: '' }));

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
  const handleInputChange = (index:any, event: any) => {
    console.log(index, event.nativeEvent.text);
    const newFloors = [...floors];
    newFloors[index].floorName = event.nativeEvent.text;
    setFloors(newFloors);
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={{fontFamily: 'Medium', fontSize:18}}>Welcome, Adam {store.firstName}</Text>
        <View style={{width: 80, height: 80, borderRadius: 50, backgroundColor: '#711e68',}}></View>
        <Text>{store.fullAddress}</Text>
      </View>
      <View style={{width: '100%', height: 20, backgroundColor: '#d1d1d1'}}></View>
      <ScrollView style={styles.lowerContainer}>
       
       
 { step === 1 ? (
      <>
           <View style={{width: '100%', height: 20, backgroundColor: '#d1d1d1'}}>
            <Text>Set-up Property Profile</Text>
           </View>
      <View style={{flexDirection:'row', alignItems: 'center',marginBottom: 20 }}>
          <Text 
          style={styles.text}
          >Name Property </Text>
          <TextInputMUI variant="outlined" label="Property Name" style={{  width: 150, marginLeft: 'auto' }} />
        </View>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style={styles.text}>Add/Change Property Image </Text>
          <Pressable style={{marginLeft: 'auto'}} onPress={pickPropertyImage}>
            <View style={{width: 20, height: 20, borderRadius: 50, borderWidth: 1, }}></View>
          </Pressable>
        </View>
        {propertyImage && <Image source={{ uri: propertyImage }} style={{ width: 90, height: 100 }} /> }
        <Button1 title="Continue" onPress={nextStep} />
  </>
  ) : step === 2 ? (
   
    <View>
        <View style={{width: '100%', height: 20, backgroundColor: '#d1d1d1'}}>
            <Text>Tell us about the floor layout</Text>
           </View>
      <Pressable onPress={prevStep}>
      <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
      </Pressable>

      <Text>
        How many floors does this property have including basements, crawl spaces and attics?
      </Text>
      
      <View style={{flexDirection: 'row', alignItems:'center'}}>
      <MaterialCommunityIcons name="layers-plus" size={24} color="black" />
        <Text>Floors/levels </Text>
      <Slider
        style={{width: 160, height: 40}}
        minimumValue={0}
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
   {Array.from({length: floorSliderValue}, (_, index) =>
    (
    
      <>
      <Text>{`Level ${index + 1}`}</Text>
      <TextInputMUI 
        key={index}
        variant='outlined' 
        style={{marginBottom: 10, width: 180,}} 
        
        onChange={(event) => handleInputChange(`${index}`, event)}
      />
      </>
      ))
      }
          <Button1 title="Print" onPress={() => console.log(floors)} />

    <Button1 title="Next" onPress={nextStep} />
  </View>
  ) : step === 3 ? (
    <View>
        <View style={{width: '100%', height: 20, backgroundColor: '#d1d1d1'}}>
            <Text>Tell us about the rooms & areas</Text>
           </View>
       <Button1 title="button" onPress={prevStep}/>
       <View style={styles.row}>
        <Text>BedRooms</Text>
        <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="#d1d1d1"
        maximumTrackTintColor="#6e869d"
        thumbTintColor="#711e68"
        value={bedSliderValue}
      />
       </View>
     
    <Button1 title="Next" onPress={nextStep} />
  </View>
  ) : (
    <View>
       <Button1 title="button" onPress={prevStep}/>
    <Text>Step 4</Text>
    <Button1 title="Next" onPress={nextStep} />
  </View>
  )}
      </ScrollView>
     
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
    padding: 20,
  },
  text: {
    fontFamily: 'Regular',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})