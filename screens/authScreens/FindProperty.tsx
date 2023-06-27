import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import useSearchStore from '../../stateStores/SearchStore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../../components/navigation/Header';

const FindProperty = ({ navigation } : any) => {

  const store = useSearchStore();
  const [address, setAddress] = useState('')
  //Google Places Autocomplete not working with typescript
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);
  
  return (
    <SafeAreaView>
      {/* <View style={{marginTop: 100}}></View> */}
      <View style={styles.logoContainer}>
        <Text style={{fontSize: 24, }}>HOUSE EVERYTHING</Text>
      </View>

      <View style={{  paddingLeft: 20,
            paddingRight: 20,}}>
        <Text style={{marginTop: 100, marginBottom: 20}}>Find Your Property</Text>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          setAddress(data.description);
          console.log(data.structured_formatting.main_text,'secondary:', data.structured_formatting.secondary_text);
          store.setPrimarySearchResult(data.structured_formatting.main_text)
          store.setSecondarySearchResult(data.structured_formatting.secondary_text)
          navigation.navigate('PropertySearchResult');
        }}
        query={{
          key: 'AIzaSyBLof95SYbAvaXcFMSC1eh2M9vxJrjv0rU',
          language: 'en',
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            color: 'black', //To see where exactly the list is
            zIndex: 1000, //To popover the component outwards
            position: 'absolute',
            marginTop: 40,
            // paddingLeft: 20,
            // paddingRight: 20,
          },
          textInputContainer: {
            zIndex: 1000,
            position: 'absolute',
          
          },
        }} 
      />
      { <Text style={{marginTop: 100}}>{store.primarySearchResult}</Text>}
      </View>
    </SafeAreaView>
  )
}

export default FindProperty

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logoContainer: {
    marginTop: 20, 
    marginLeft: 'auto', 
    marginRight: 'auto'
  }

})