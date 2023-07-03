import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import useUserDetailsStore from '../stateStores/userDetailsStore'

const Details = ({navigation}:any) => {
  const userDetails = useUserDetailsStore();
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.upperContainerLeft}>
          <View style={styles.upperLeftPhoto}></View>
        </View>
        <View style={styles.upperContainerRight}>
          <Text>Address</Text>
          <Text>City, State, Zip</Text>
        </View>
      </View>  

        <View style={styles.lowerContainer}>


        <Pressable onPress={() => navigation.navigate('Owners')}>
          <View style={styles.lowerListContainer}>
            <View style={styles.lowerListContainerLeft}>
            </View>


            <View style={styles.lowerListContainerRight}>
              <Text style={styles.lowerListLargeText}>Owners & Managers</Text>
              <Text style={styles.lowerListSmallText}>Add additional ownership info or add add co-managers to the property</Text>
            </View>
          </View>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('AddDetails')}>
          <View style={styles.lowerListContainer}>
            <View style={styles.lowerListContainerLeft}>
            </View>
            <View style={styles.lowerListContainerRight}>
              <Text style={styles.lowerListLargeText}>Details & Specifics</Text>
              <Text style={styles.lowerListSmallText}>Capture detailed product information for individual items at the property</Text>
            </View>
          </View>
          </Pressable>

        <Pressable onPress={() => navigation.navigate('ManageDetails')}>
          <View style={styles.lowerListContainer}>
            <View style={styles.lowerListContainerLeft}>
            </View>
            <View style={styles.lowerListContainerRight}>
              <Text style={styles.lowerListLargeText}>Manage & Maintain</Text>
              <Text style={styles.lowerListSmallText}>Set-up all ongoing property items requiring service and maintenance</Text>
            </View>
          </View>
        </Pressable>

          

          

        </View>

    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: 'white',
  },
  upperContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  upperContainerLeft: {
    flex: 1,
    height: 120,
    width: 120,
  },
  upperContainerRight: {
    flex: 2,
    width: 120,
    height: 120,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  upperLeftPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
  lowerContainer: {
    flex: 1, 
  },
  lowerListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  lowerListContainerLeft: {
    height: 90,
    width: 90,
    backgroundColor: 'grey',

  },
  lowerListContainerRight: {
    width: 250,
    flexDirection: 'column',
    justifyContent: 'center',
    // marginRight: 10,
   
  },
  lowerListSmallText: {
    fontSize: 12,
  },
  lowerListLargeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})