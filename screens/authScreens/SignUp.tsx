import React, { createRef, useEffect, useRef, useState } from 'react'
import { Button, Alert, Dimensions, KeyboardAvoidingView, Pressable, StyleSheet, Text, TouchableOpacity, TextInput, View, Modal, TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/core'
// import { FIREBASE_AUTH } from '../../firebaseConfig'
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import auth from '@react-native-firebase/auth';
import Header from '../../components/navigation/Header';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useSignUpStore from '../../stateStores/SignUpStore';
import Checkbox from 'expo-checkbox';
import { TextInput as TextInputMUI } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button1 from '../../components/Button1';

// import SmoothPinCodeInput from 4'react-native-smooth-pincode-input';

type FormValues = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  mobileNumber: yup.string().required(),
  email: yup.string().required(),
});

const SignUp = ({navigation}: any) => {
  
  const store = useSignUpStore();
  const [confirm, setConfirm] = useState<any>(null);
  // const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

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
  async function signInWithPhoneNumber(phoneNumber: any) {
    try {
      // Alert.alert(phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      Alert.alert('Confirmation code has been sent to your phone.');
      setConfirm(confirmation);
    } catch (error) {
      Alert.alert(`errror::,${error}`);
      // Alert.alert('Failed to sign in with phone number.');
    }
  }

  const [email, setEmail] = useState('test@gmail.com');
  const [username, setUsername] = useState('username');

  async function confirmCode(pin: string) {

    //commented out for testing, uncomment for phone auth
    // try {
    //   console.log(pin)
    //   await confirm.confirm(pin);
    //   const user: any = auth().currentUser;

    //   await user.updateEmail(email); // set user's email
    //   await user.updateProfile({
    //     displayName: username, // set "display name" as the user's username
    //   });
    //   try {
    //     await AsyncStorage.setItem('UID', user.uid);
    //   } catch (e) {
    //   }

      setModalVisible(!modalVisible)
      navigation.navigate('PropertySetup');

    // } catch (error) {
    //   console.log('Invalid code.');
    // }

  }

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormValues) => {
    console.log(data);
    store.setFirstName(data.firstName);
    setModalVisible(!modalVisible)
    signInWithPhoneNumber(`+1` + data.mobileNumber.toString())
    // sendItemDetails({...data,...dataValues}, actualImage);  
  };
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
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
         <View style={styles.backdrop}/>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 50}}>HOUSE EVERYTHING</Text>
        <Text style={[styles.modalText, {fontWeight: 'bold'}]}>Enter verification code</Text>
        <Text style={styles.modalText}>If you're having issues, please contact House Everything at support@houseeverything.com.</Text>
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
      <Button1 title="Confirm Code" onPress={() => confirmCode(pin.join(''))} />    
          {/* <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableHighlight> */}
        </View>
      </Modal>
      {/* <Header /> */}
      <View style={{backgroundColor: '#566C81', height: 100, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{store.primarySearchResult}</Text>
        <Text>{store.secondarySearchResult}</Text>

      </View>
      <View style={styles.formContainer}>
{/* <Button onPress={getData} title="Get Data" /> */}
      <Text style={{marginTop: 10, marginBottom: 20, fontSize: 18, fontWeight: 'bold'}}>Verify ownership & set-up account</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <View>
          {/* <Text style={styles.smallText}>First Name</Text>  */}
          <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
          <TextInputMUI 
            variant="outlined" 
            label='First Name' 
            style={[ {width: 120, marginTop: 10}]} 
            value={value} 
            onChangeText={onChange} />
          )}
          name="firstName"
        />
          </View>

        <View>
         
          <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
          <TextInputMUI style={[ {width: 120, marginTop: 10}]} variant="outlined" label='Last Name' value={value} onChangeText={onChange} />
          )}
              name="lastName"
            />
        </View>
        
      </View>

      {/* <Text style={styles.smallText}>Mobile Number</Text> */}
      <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
      <TextInputMUI style={{marginTop: 20}} variant="outlined" label='Mobile Number' value={value} onChangeText={onChange} />
      )}
      name="mobileNumber"
    />
      {/* <Text style={styles.smallText}>Email</Text> */}
      <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
      <TextInputMUI  style={{marginTop: 20, marginBottom: 20}} variant="outlined" label='Email' value={value} onChangeText={onChange} />
      )}
      name="email"
    />
      <View style={{flexDirection: 'row', marginRight: 20, }}>
        <View 
        // style={{width: 20, height: 20,  borderWidth: 1, marginRight: 10}}
        >
        <Checkbox
          style={{marginRight: 10}}
          value={isChecked}
          disabled={!isValid}
          onValueChange={setChecked}
          color={isValid ? '#4630EB' : undefined}
        />
      {/* <Checkbox
      
        uncheckedColor='blue'
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
      /> */}
      </View>
      <Text>I agree: (i) I am (or I have authority to act on behalf of the owner of this home; (ii) I will not provide incorrect information or state a discriminatory preference; and (iii) I will comply with the Terms of Use.</Text>
      </View>

      {/* <TouchableHighlight
        style={[styles.openButton, {marginTop: 20}]}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={[styles.textStyle]}>Show Modal</Text>
      </TouchableHighlight> */}
      <Pressable 
      style={[styles.button, {backgroundColor: isChecked ? '#7C106B' : '#d1d1d1'}]}
      onPress={
        // () => {
        // if (isChecked)
        handleSubmit(onSubmit)
      // }
    }
      // onPress={() => signInWithPhoneNumber('+1 845-705-5261')}
      >
        <Text style={styles.buttonText}>Verify</Text>
    </Pressable>
      {!confirm? 
    <>
    {/* <Pressable 
      style={styles.button}
      onPress={handleSubmit(onSubmit) }
      // onPress={() => signInWithPhoneNumber('+1 845-705-5261')}
      >
        <Text style={styles.buttonText}>Verify</Text>
    </Pressable> */}

      </>
      :
      <>
      {/* <TextInput style={styles.input} value={code} onChangeText={text => setCode(text)} /> */}
      {/* <Button title="Confirm Code" onPress={() => confirmCode(pin.join(''))} /> */}
      {/* <View style={{flexDirection: 'row'}}>
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
      <Button title="Confirm Code" onPress={() => confirmCode(pin.join(''))} />
      </View> */}
      </>
      }
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  formContainer: {
    marginHorizontal: 20
    },
  inputContainer: {
    width: '80%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
   
    
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#7C106B',
    width: 180,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
   
    borderRadius: 20,
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
  smallText: { 
    color: 'grey',
    marginBottom: 10,
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
  modalView: {
    
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    bottom: 0,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: '90%',
  },
  openButton: {
    backgroundColor: '#7C106B',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#000000',
    opacity: 0.5,
  },

})