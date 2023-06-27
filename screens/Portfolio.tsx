import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BarcodeScanner from '../components/BarcodeScanner'

const Portfolio = () => {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.welcomeText}>Hey there, welcome to House Everything!</Text>
      
      <View style={styles.contentRow}>
        <View style={styles.completeProfileContainer}>
          <Text>Current Portfolio</Text>
        </View>

        <View style={styles.completeProfileContainer}>
          <Text>Current Portfolio</Text>
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
  completeProfileContainer: {
    height: 130,
    width: 130,
    backgroundColor: 'grey',
  },
})