import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Pressable } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}
const Button1: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button1

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7C106B',
    // width: 180,
    width: "100%",
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
   
    borderRadius: 10,
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