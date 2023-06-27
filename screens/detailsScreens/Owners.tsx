import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Owners = () => {
  return (
    <View style={styles.container}>
           <View style={styles.upperContainer}>
        <View style={styles.upperContainerLeft}>
          <View style={styles.upperLeftPhoto}></View>
        </View>
        
      </View>
      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>Home Categories</Text>
      </View>

      <View style={styles.rowContainer}>
        <View>
        <Text>Owners</Text>
        </View>
      
        <View>
        <Text>Owners</Text>
        </View>
      </View>

    </View>
  )
}

export default Owners

const styles = StyleSheet.create({
   container : {
    flex: 1,
    backgroundColor: 'white',
  },
    upperContainer: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',

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
  dividerContainer: {
    height: 25,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  dividerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
})