import React, { createRef, useEffect, useRef, useState } from 'react'
import { Button, Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
// import { FIREBASE_AUTH } from '../../firebaseConfig'
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput as TextInputMUI } from "@react-native-material/core";
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button1 from '../../components/Button1';
import firestore from '@react-native-firebase/firestore';


type FormValues = {
  mobileNumber: string;
}
const schema = yup.object().shape({
  mobileNumber: yup.string().required().min(10).max(10),
});

const Login = () => {

  const [confirm, setConfirm] = useState<any>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  async function onAuthStateChanged(user:any) {
    if (user) {
      
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    console.log('oasc: ',user.uid)
    try {
      await AsyncStorage.setItem('UID', user.uid);
    } catch (e) {
      // saving error
    }
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UID');
      if (value !== null) {
        // value previously stored
        console.log('value: ',value)
      }
    } catch (e) {
      // error reading value
      console.log('error: ',e)
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber:any) {
    try {
      // Get the user document
      // const userDoc = await firestore().collection('users').doc(phoneNumber).get();
      // console.log('userDoc: ',userDoc)
      // // If the user document does not exist, throw an error
      // if (!userDoc.exists) {
      //   throw new Error('No account found for this phone number');
      // }
  
      // Otherwise, sign in the user
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log(confirmation)
      // setConfirm(confirmation);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  // async function signInWithPhoneNumber(phoneNumber: string) {
  //   try {
  //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //     console.log('Confirmation code has been sent to your phone.');
  //     // User signed in, check if their uid is in the Firestore
  //     // const uid = auth.currentUser.uid;
  //     const userDocument = await firestore().collection('users').doc(uid).get();
  //     if (!userDocument.exists) {
  //       throw new Error('User not found. Please sign up before signing in.');
  //     }
  //     return confirmation;
  //   } catch (error) {
  //     console.log('Error during sign in:', error);
  //   }
  // }
 
  const [email, setEmail] = useState('test@gmail.com');
  const [username, setUsername] = useState('username');
  async function confirmCode() {
    try {
      console.log(code)
      await confirm.confirm(code);
      const user: any = auth().currentUser;

      await user.updateEmail(email); // set user's email
      await user.updateProfile({
        displayName: username, // set "display name" as the user's username
      });
      console.log('success')
    } catch (error) {
      console.log('Invalid code.');
    }
  }
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('+1 845-705-5261')}
  //     />
  //   );
  // }
  const [pin, setPin] = useState(Array(6).fill(''));
  const inputRefs = Array(6).fill(null).map(() => createRef<TextInput>());

  const handleInputChange = (text: string, index: number) => {
    setPin(prevState => {
      const newPin = [...prevState];
      newPin[index] = text;
      return newPin;
    });
    
    if (text) {
      if (index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    } else if (index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View></View>
      <Text style={{marginTop: 100, fontSize: 40}}>House Everything</Text>
      <Text style={{fontSize: 20}}>Login</Text>
    <View style={{marginTop: 50, width: 260}}>
    <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
      <TextInputMUI style={{marginTop: 20}} variant="outlined" label='Mobile Number' value={value} onChangeText={onChange} />
      )}
      name="mobileNumber"
    />
    </View>
 {confirm ? 
  <>
          <View style={{flexDirection: 'row'}}>
      {pin.map((value, index) => (
        <TextInput
          key={index}
          ref={inputRefs[index]}
          style={styles.pinInput}
          onChangeText={(text) => handleInputChange(text, index)}
          value={value}
          maxLength={1}
          keyboardType="number-pad"
        />
      ))}
      
      </View>
    <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button1 title="Confirm Code" onPress={() => confirmCode()} />
  </>
 :
  <>
  <Button1 title='Sign In' onPress={() => signInWithPhoneNumber('+1 845-705-5261')}/>
  </>
}
   
      
  </View>
  )
}

export default Login

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  pinInput : {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 30,
    margin: 5,
    fontSize: 20,
    paddingLeft: 7,
    // justifyContent: 'center',
  
  },


})