import React, { useEffect, useRef, useState } from 'react'
import { Button, Dimensions, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
// import { FIREBASE_AUTH } from '../../firebaseConfig'
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import auth from '@react-native-firebase/auth';
import Header from '../../components/navigation/Header';
import { Checkbox } from 'react-native-paper';
import { useForm, Controller, set } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const SignUp = () => {
  
  const [confirm, setConfirm] = useState<any>(null);
  const [checked, setChecked] = useState(false);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user:any) {
    if (user) {
      
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
      console.log('oasc: ',user.uid)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber:any) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }


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
  const onSubmit = (data: FormValues) => {
    console.log(data);
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

  return (

    <View style={styles.container}>
      <Header />
      <View style={{backgroundColor: 'lightblue', height: 70, justifyContent: 'center'}}>
        <Text>HOUSE ADDRESS</Text>
      </View>
      <View style={styles.formContainer}>

      
      <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>Verify ownership & set-up account</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
        <View>
          <Text style={styles.smallText}>First Name</Text> 
          <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, {width: 120}]} value={value} onChangeText={onChange} />
          )}
          name="firstName"
        />
          </View>

        <View>
          <Text style={styles.smallText}>First Name</Text> 
          <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
          <TextInput style={[styles.input, {width: 120}]} value={value} onChangeText={onChange} />
          )}
              name="lastName"
            />
        </View>
        
      </View>

      <Text style={styles.smallText}>Mobile Number</Text>
      <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
      <TextInput style={styles.input} value={value} onChangeText={onChange} />
      )}
      name="mobileNumber"
    />
      <Text style={styles.smallText}>Email</Text>
      <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
      <TextInput style={styles.input} value={value} onChangeText={onChange} />
      )}
      name="email"
    />
      <View style={{flexDirection: 'row', marginRight: 20}}>
        <View style={{width: 20, height: 20,  borderWidth: 1, marginRight: 10}}>
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
      
      {!confirm? 
    <>
    <Pressable 
      style={styles.button}
      onPress={handleSubmit(onSubmit) }
      // onPress={() => signInWithPhoneNumber('+1 845-705-5261')}
      >
        <Text style={styles.buttonText}>Verify</Text>
    </Pressable>

      </>
      :
      <>
      <TextInput style={styles.input} value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
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
    backgroundColor: '#0782F9',
    width: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
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

})