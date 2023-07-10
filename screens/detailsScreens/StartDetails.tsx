import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons';

const StartDetails = ({navigation} : any) => {
  return (
    <View style={styles.container}>
    <View style={styles.upperContainer}>
      <View style={styles.upperContainerLeft}>
        <View style={styles.upperLeftPhoto}></View>
      </View>
      <View style={styles.upperContainerRight}>
        <Text style={styles.upperContainerLargeText}>Details & Specifics</Text>
        <Text style={styles.upperContainerSmallText}>Add items that are part of the property. Do this when you have access to the either the  items, receipts, manuals, product details or labels and the like.</Text>
      </View>
    </View>  

      <View style={styles.lowerContainer}>
<Pressable onPress={() => navigation.navigate('ByLocations')}>
  <View style={styles.selectRow}>
  <Octicons name="stack" size={35} color="black" />
    <Text style={styles.rowText}>By Location</Text>
  </View>
</Pressable>

<View style={styles.divider}/>

<Pressable onPress={() => navigation.navigate('ByRoomsAndFloors')}>
<View style={styles.selectRow}>
  <Octicons name="stack" size={35} color="black" />
  <Text style={styles.rowText}>By Room, Area or Floors</Text>
</View>
</Pressable>


<View style={styles.divider}/>

<Pressable onPress={() => navigation.navigate('AddDetails')}>
<View style={styles.selectRow}>
  <Octicons name="stack" size={35} color="black" />
  <Text style={styles.rowText}>By Category</Text>
</View>
</Pressable>

<View style={styles.divider}/>

<Pressable onPress={() => navigation.navigate('ByObject')}>
 <View style={styles.selectRow}>
  <Octicons name="stack" size={35} color="black" />
  <Text style={styles.rowText}>For a specific Object</Text>
</View>
</Pressable>

<View style={styles.divider}/>      

        

      </View>

  </View>
  )
}

export default StartDetails

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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperContainerRight: {
    flex: 2,
    width: 120,
    height: 120,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
   
  },
  upperContainerSmallText: {
    fontSize: 12,
  },
  upperContainerLargeText: {
    fontSize: 20,
  },
  upperLeftPhoto: {
    width: 90,
    height: 90,
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
  selectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  rowText: {
    fontSize: 20,
    paddingLeft: 20,
  },
  divider : {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginLeft: 70
  }
})