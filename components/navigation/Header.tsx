import React, {useRef, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Animated, Dimensions, Button, TextInput, SafeAreaView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Drawer } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Header = ({navigation}:any) => {

  const [active, setActive] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState('');

  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width / 2)).current; // Initial value

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    Animated.timing(
      slideAnim,
      {
        toValue: modalVisible ? -Dimensions.get('window').width / 2 : 0, // toValue will be 0 if opening modal, -window.width/2 if closing
        duration: 500, // how long the animation will take
        useNativeDriver: false, // Add This line
      }
    ).start();
  };


  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  
  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get('window').width / 2,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setModalVisible(false)); // After the animation ends, close the modal
  };

  return (
    <SafeAreaView style={styles.header}>

  <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>

    <Pressable style={[styles.button]}
      // onPress={() => navigation.goBack()}
    >
      <Text style={[styles.button, styles.buttonText]}>
        Back
      </Text>
    </Pressable>

  <View style={styles.inputContainer}>
  
  <MaterialIcons name="search" size={24} color="black" />

     <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Search for another property"
        clearButtonMode="always"
        value={text}
      />
</View>
    <Pressable
      style={[styles.button,]}
      onPress={toggleModal}>
      <MaterialIcons name="account-circle" size={30} color="grey" />    
    </Pressable>

  </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
  },
  input: {
    height: 40,
    width: 200,
    // margin: 12,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 10,  // to provide 10 width from the edges
    // backgroundColor:'red',
    borderBottomWidth: 2,
    borderBottomColor: '#D8D8D8',
  },
  buttonContainer: {
    flex: 1,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor:'red',
    height: 100,
  },
  modalView: {
    margin: 20,
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
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: 'grey',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
});



    {/* <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal> */}