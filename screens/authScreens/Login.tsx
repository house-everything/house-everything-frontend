import React, { useEffect, useRef, useState } from 'react'
import { Button, Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
// import { FIREBASE_AUTH } from '../../firebaseConfig'
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



const Login = () => {

  // const auth = FIREBASE_AUTH;
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [loading, setLoading] = useState(false)
  // const navigation = useNavigation()

  // const handleLogin = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await signInWithEmailAndPassword(auth, email, password);
  //     console.log(response);

  //   } catch (error) {
  //     console.log('Sign In Failure: ' + error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // const handleSignUp = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log(response);
  //   } catch (error) {
  //     console.log('Sign Up Failure: ' + error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  



  return (
    <View
    // style={styles.container}
    // behavior="padding"
  >
    <View style={{marginTop: 100}}></View>
        {/* <GooglePlacesAutocomplete
              ref={ref}
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyBLof95SYbAvaXcFMSC1eh2M9vxJrjv0rU',
        language: 'en',
      }}
    /> */}
   
    {/* <View style={styles.inputContainer}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        // onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={handleSignUp}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Register</Text>
      </TouchableOpacity>
      <Button
      title='Sign Up'
        onPress={() => handleSignUp()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Button>
    </View> */}
  </View>
  )
}

export default Login

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
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


})