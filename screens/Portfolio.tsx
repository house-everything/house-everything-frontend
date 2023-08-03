import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarcodeScanner from '../components/BarcodeScanner'
import useUserDetailsStore from '../stateStores/userDetailsStore'
import useSignUpStore from '../stateStores/SignUpStore'

const Portfolio = ({navigation}:any) => {
  const userDetails = useUserDetailsStore();
  const userStore = useSignUpStore();
  return (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.welcomeText}>
        Welcome {userStore.firstName}.
      </Text>
      
      <View style={styles.contentRow}>

        <View style={styles.upperRowContainer}>
          {userStore.userImage
          ? 
          <Image source={{ uri: userStore.userImage }} style={{ width: 90, height: 90, borderRadius: 50, marginBottom: 10 }}/>
          :
<View style={styles.completeProfilePhoto}/>          }
          <Text style={styles.largeText}>{userStore.firstName}'s Portfolio</Text>
          <Text style={styles.smallText}>Add/edit details</Text>
        </View>
        
        <Pressable onPress={() => navigation.navigate('Details')}>
        <View style={styles.upperRowContainer}>
        
          {userStore.propertyImage
          ? 
          <Image source={{ uri: userStore.propertyImage }} style={{ width: 90, height: 90, borderRadius: 50, marginBottom: 10 }}/>
          :
          <View style={styles.completeProfilePhoto}/>          
          }
          <Text style={styles.largeText}>Property details</Text>
          <Text style={styles.smallText}>Add/edit details</Text>

        </View>
        </Pressable>
       
      </View>

      <View style={styles.contentRow}>

      <View style={styles.upperRowContainer}>
      <View style={styles.squareImageContainer}/>
        <Text style={styles.largeText}>Connect</Text>
        <Text style={styles.smallText}>Integrate with your contacts & calendar</Text>
      </View>

      
      <View style={styles.upperRowContainer}>

        <View style={styles.squareImageContainer}/>
        <Text style={styles.largeText}>Review reports</Text>
        <Text style={styles.smallText}>Review & update reports</Text>
      </View>

      </View>
      <View style={styles.contentRow}>

<View style={styles.upperRowContainer}>
<View style={styles.squareImageContainer}/>
  <Text style={styles.largeText}>Connect</Text>
  <Text style={styles.smallText}>Integrate with your contacts & calendar</Text>
</View>


<View style={styles.upperRowContainer}>

  <View style={styles.squareImageContainer}/>
  <Text style={styles.largeText}>Review reports</Text>
  <Text style={styles.smallText}>Review & update reports</Text>
</View>

</View>
<View style={{marginBottom: 50}}/>
    </ScrollView>
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
  width: 150
  }, 
  squareImageContainer: {
    height: 150,  
    width: 150,
    backgroundColor: 'grey',
  },
  largeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  smallText: {
  },
})