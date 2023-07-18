import { Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useSignUpStore from '../../stateStores/SignUpStore';
import axios from 'axios';
import { SERVER_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Button1 from '../../components/Button1';

const PropertySearchResult = ({ navigation } : any) => {

  const [propertyDetails, setPropertyDetails] = useState<any>([]);
  const [confirm, setConfirm] = useState<boolean>(true);
  const [currentOwner, setCurrentOwner] = useState<boolean>(false);
  const [primaryResidence, setPrimaryResidence] = useState<boolean>(false);
  const getPropertyDetails = async () => {
    axios.get(SERVER_URL + 'http://localhost:8000/property_details').then((response) => {
      console.log(response.data);
    })
    console.log('url: ' + SERVER_URL);  
  }
  const store = useSignUpStore();
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SERVER_URL + '/property_details', {
          params: {
            address1: store.primarySearchResult,
            address2: store.secondarySearchResult,
            // add more parameters here
          }});
          // console.log(response.data.property.map((property: any) => property.building.rooms.beds));
          setPropertyDetails(response.data.property);
        } catch (error) {
          console.log(error);
        // setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <View>

      {/* <Text>PropertySearchResult</Text> */}
      <View style={{ backgroundColor: 'blue', height: 200}}></View>

      {/* <Button title="Go back" onPress={() =>navigation.navigate('SignUp')} />

      <Button title="Get Property Details" onPress={() => getPropertyDetails()} /> */}
      {/* { <Text onPress={() => console.log('url:')}  style={{marginTop: 100}}>{store.primarySearchResult}</Text>} */}
     {confirm 
     ?
      <View style={{padding: 20}}>
      {propertyDetails && propertyDetails.map((property: any, index: number) => {
      // console.log(`Rendering property ${index}`);
      return (
        <>
      <Text style={styles.smallText}>{property.address.oneLine}</Text>

      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.smallText, {fontWeight: 'bold'}]}>{property.building.rooms.beds}</Text> 
        <Text style={styles.smallText}> bds |  </Text>
        <Text style={[styles.smallText, {fontWeight: 'bold'}]}>{property.building.rooms.bathstotal}</Text>
        <Text style={styles.smallText}> ba |  </Text>
        <Text style={[styles.smallText, {fontWeight: 'bold'}]}>{property.building.size.bldgsize}</Text>
        <Text style={styles.smallText}> sqft  </Text>
      </View>

      <Text style={styles.smallText}>{property.summary.propsubtype}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.smallText}>Built in </Text>
        <Text style={[styles.smallText, {fontWeight: 'bold'}]}>{property.summary.yearbuilt}</Text>
        <Text style={styles.smallText}> | {currentYear - property.summary.yearbuilt} years old</Text>
      </View>
      <Text style={styles.smallText}>Status <Text style={[styles.smallText, {fontWeight: 'bold'}]}>unclaimed</Text></Text>

        </>
        );
      })}

      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 50}}>Own this property?</Text>
      <Button1 title='Claim Property' onPress={() => setConfirm(false)} />
  </View>
  :
  <View style={{padding: 20}}>
       {propertyDetails && propertyDetails.map((property: any, index: number) => {
      // console.log(`Rendering property ${index}`);
      return (
        <>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.smallText, {fontWeight: 'bold'}]}>{property.building.rooms.beds}</Text> 
        <Text style={styles.smallText}> bds |  </Text>
        <Text style={[styles.smallText, {fontWeight: 'bold'}]}>{property.building.rooms.bathstotal}</Text>
        <Text style={styles.smallText}> ba |  </Text>
        <Text style={[styles.smallText, {fontWeight: 'bold'}]}>{property.building.size.bldgsize}</Text>
        <Text style={styles.smallText}> sqft  </Text>
      </View>
      <Text>Do you currently own this property?</Text>
      <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.button, {backgroundColor: currentOwner? '#7C106B' : 'white', borderWidth: 2, borderColor: '#7C106B'}]} onPress={() => setCurrentOwner(true)}>
          <Text style={[styles.buttonText, {color: currentOwner? 'white':'#7C106B' }]}>YES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, {backgroundColor: currentOwner? 'white':'#7C106B' , borderWidth: 2, borderColor: '#7C106B'}]} onPress={() => setCurrentOwner(false)}>
          <Text style={[styles.buttonText, {color: !currentOwner? 'white':'#7C106B' }]}>NO</Text>
        </TouchableOpacity>
      </View>

      <Text>Is it your primary residence?</Text>
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={[styles.button, {backgroundColor: primaryResidence? '#7C106B' : 'white', borderWidth: 2, borderColor: '#7C106B'}]} onPress={() => setCurrentOwner(true)}>
        <Text style={[styles.buttonText, {color: primaryResidence? 'white':'#7C106B' }]}>YES</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, {backgroundColor: primaryResidence? 'white':'#7C106B' , borderWidth: 2, borderColor: '#7C106B'}]} onPress={() => setCurrentOwner(false)}>
        <Text style={[styles.buttonText, {color: !primaryResidence? 'white':'#7C106B' }]}>NO</Text>
      </TouchableOpacity>
        </View>
        <Button1 title='Claim it' onPress={() => navigation.navigate('SignUp')} />
        </>
        );
      })}
  </View>
  }
    </View>
  )
}

export default PropertySearchResult

const styles = StyleSheet.create({
  smallText: {
  fontSize: 16,
  // padding: 2,
  marginVertical: 5
  },
  button: {
    backgroundColor: '#7C106B',
    width: 150,
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
})