import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useSearchStore from '../../stateStores/SearchStore';
import axios from 'axios';
import { SERVER_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const PropertySearchResult = ({ navigation } : any) => {

  const [propertyDetails, setPropertyDetails] = useState<any>([]);

  const getPropertyDetails = async () => {
    axios.get(SERVER_URL + 'http://localhost:8000/property_details').then((response) => {
      console.log(response.data);
    })
    console.log('url: ' + SERVER_URL);  
  }
  const store = useSearchStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SERVER_URL + '/property_details', {
          params: {
            address1: store.primarySearchResult,
            address2: store.secondarySearchResult,
            // add more parameters here
          }});
          console.log(response.data.property);
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
      <View style={{marginTop: 100}}></View>
      <Button title="Go back" onPress={() =>navigation.navigate('FindProperty')} />

      <Button title="Get Property Details" onPress={() => getPropertyDetails()} />
      {/* { <Text onPress={() => console.log('url:')}  style={{marginTop: 100}}>{store.primarySearchResult}</Text>} */}
      {propertyDetails && propertyDetails.map((property: any, index: number) => {
  console.log(`Rendering property ${index}`);
  return <Text>{property.address.oneLine}</Text>;
})}
    </View>
  )
}

export default PropertySearchResult

const styles = StyleSheet.create({})