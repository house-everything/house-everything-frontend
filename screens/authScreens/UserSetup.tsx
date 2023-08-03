import { Image, Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react';
import useSignUpStore from '../../stateStores/SignUpStore';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker'
import { useFonts } from "expo-font";
import Button1 from '../../components/Button1';
import Slider from '@react-native-community/slider';
import { TextInput as TextInputMUI } from "@react-native-material/core";
import moment from 'moment';


const UserSetup = () => {
  const store = useSignUpStore();
  const [step, setStep] = useState(true);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState<any>(null);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [dateSelected, setDateSelected] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)

  const interests = [
    'Renovations',
    'Insurance',
    'Pool & Spa',
    'Building Materials',
    'DIY',
    'Gardening',
    'Home Security',
    'Warranty',
    'Home Loans',
  ]
  let dateStr: string = "2023-07-24T14:53:03.522Z";
  let date2: moment.Moment = moment(date);
  
  let formattedDate: string = date2.format('DD-MM-YYYY');
  // const nextStep = () => setStep(step + 1);
  // const prevStep = () => setStep(step - 1);
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
      setImage(result.assets[0].uri);
      store.setUserImage(result.assets[0].uri);
    }
  };
const [homes, setHomes] = useState<any>([])
  const handleInputChange = (index:any, event: any) => {
    // console.log(index, event.nativeEvent.text);
    const newHomes = [...homes];
    newHomes[index] = event.nativeEvent.text;
    setHomes(newHomes);
  };
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleButtonClick = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const setAuth = useSignUpStore((state) => state.setAuthenticated);
  const submitForm = () => {
    store.setAuthenticated(true);
  }
  const [loadedFonts] = useFonts({
    Bold: require("../../assets/fonts/Roboto-Bold.ttf"),
    Regular: require("../../assets/fonts/Roboto-Regular.ttf"),
    Medium: require('../../assets/fonts/Roboto-Medium.ttf')
  });
  if (!loadedFonts) {
    return <View/>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={{fontFamily: 'Medium', fontSize:18, marginBottom: 10}}>Welcome,{store.firstName} {store.authenticated? 'false':
        'treue'}</Text>
        {image? 
        <Image source={{ uri: image }} style={{ width: 90, height: 90, borderRadius: 50, marginBottom: 10 }} />
        :
        <View style={{width: 80, height: 80, borderRadius: 50, backgroundColor: '#711e68', marginBottom: 10}}></View>
        }
       
       
        {/* <Text style={styles.text}>{store.fullAddress}</Text> */}
      </View>

   {step? 
   <>
    <View style={{width: '100%', backgroundColor: '#d1d1d1'}}>
       <Text style={styles.mediumText}>Tell us a little about yourself</Text>
     </View>
    <ScrollView style={styles.lowerContainer}>
     <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style={styles.text}>Add profile picture</Text>
          <Pressable style={{marginLeft: 'auto',borderColor: '#d1d1d1', borderWidth: 2, borderRadius: 50, height: 40, width: 40, alignItems: 'center', justifyContent: 'center'}} onPress={pickPropertyImage}>
            <MaterialCommunityIcons name="camera-plus" size={24} color="black" />
          </Pressable>
      </View>
      
      <View style={[styles.row, { height: 80}]}>
      <Text style={styles.text}>Date of Birth</Text>
      {dateSelected ? 
      <>
      <Text style={styles.text}>{formattedDate}</Text> 
      <Pressable onPress={() => setOpen(true)}>

      <MaterialCommunityIcons name="pencil-plus" size={24} color="black" />
      </Pressable>
      </>
      :
     
      <Pressable onPress={() => setOpen(true)} style={[styles.dateButton, {}]}>
        <Text
        style={styles.mediumText}>Select Date</Text>
      </Pressable>
      } 
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          setDateSelected(true)
          console.log(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
        
      </View>
     
    <Text style={styles.text}>How many pervious homes have you owned?</Text>
    <View style={[styles.row, {marginVertical: 10}]}>
     <Slider
        style={{width: 250, height: 40,  marginRight: 15}}
        minimumValue={1}
        maximumValue={10}
        minimumTrackTintColor="#d1d1d1"
        maximumTrackTintColor="#6e869d"
        thumbTintColor="#711e68"
        value={sliderValue}
        onValueChange={setSliderValue}
        step={1}
      />
      <Text style={styles.text}>{sliderValue}</Text>
    </View>
   {sliderValue > 0 ? 
   <Text style={[styles.text, {marginBottom: 15}]}>What was your previous addresses</Text>
   :
   null}
    {Array.from({length: sliderValue}, (_, index) =>
    (
    
      <>
      {/* <Text style={styles.row}>{`Level ${index + 1}`}</Text> */}
      <TextInputMUI 
        key={index}
        variant='outlined' 
        style={{marginBottom: 10,}} 
        inputContainerStyle={{height: 50,  }}
        inputStyle={{paddingBottom: 5, fontSize: 18}}
        onChange={(event) => handleInputChange(`${index}`, event)}
      />
      
      </>
      ))
      }
      <Button1 title="Next" onPress={() => setStep(false)} />
      <View style={{height: 100}}></View>
    </ScrollView>
   </>
  :
  <>
  <View style={{width: '100%', backgroundColor: '#d1d1d1'}}>
    <Text style={styles.mediumText}>Tell us about your property related interests</Text>
  </View>
  <ScrollView style={styles.lowerContainer}>
  <Pressable onPress={() => setStep(true)}>
      <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
      </Pressable>
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
    {interests.map((interest, index) => (
      <TouchableOpacity key={index}  style={[
        styles.interestButton, 
        selectedInterests.includes(interest) && styles.selectedInterestButton
      ]}
      onPress={() => handleButtonClick(interest)}
           >
        <Text style={{fontFamily: 'Regular', fontSize: 14}}>{interest}</Text>
      </TouchableOpacity>
    ))}
    </View>
    <Button1 title="Finish" onPress={() => submitForm()} />
    </ScrollView>
  </>
  }
    </View>
  )
}

export default UserSetup

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
      padding: 20,
      
    },
    mediumText: {
      fontFamily: 'Medium',
      fontSize: 16, 
      padding: 8
    },
    text: {
      fontFamily: 'Regular',
      fontSize: 18,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    interestButton: {
      minWidth: 70,
      borderWidth: 2,
      padding: 10,
      marginHorizontal: 5,
      marginVertical: 5,
      borderRadius: 15,
      borderColor: '#d1d1d1',
      justifyContent: 'center',
      alignItems: 'center'
    },
    selectedInterestButton: {
    borderColor: '#711e68'
    },
    dateButton: {
      borderWidth: 2,
      padding: 5,
      marginHorizontal: 5,
      marginVertical: 5,
      borderRadius: 15,
      borderColor: '#711e68'
    },
})