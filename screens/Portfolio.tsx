import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarcodeScanner from '../components/BarcodeScanner'
import useUserDetailsStore from '../stateStores/userDetailsStore'

const Portfolio = ({navigation}:any) => {
  const userDetails = useUserDetailsStore();

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.welcomeText}>Welcome {userDetails.firstName}.</Text>
      
      <View style={styles.contentRow}>
        <View style={styles.upperRowContainer}>
          <View style={styles.completeProfilePhoto}/>
          <Text>{userDetails.firstName}'s Portfolio</Text>
        </View>
        

        <View style={styles.upperRowContainer}>
          
        <Pressable onPress={() => navigation.navigate('Details')}>

          <View style={styles.completeProfilePhoto}/>
          <Text>Property details</Text>
          </Pressable>
        </View>
       
      </View>
      <BarcodeScanner />
    </View>
  )
}

export default Portfolio

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  welcomeText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    fontSize: 18,
  },
  completeProfilePhoto: {
    height: 130,
    width: 130,
    backgroundColor: 'grey',
    borderRadius: 100,
  },
  upperRowContainer: {
  flexDirection: 'column',
  alignItems: 'center',
  }
})