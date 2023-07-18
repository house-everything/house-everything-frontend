import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Pressable } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const ConditionalButton = () => {
  return (
    <View>
      <Text>ConditionalButton</Text>
    </View>
  )
}

export default ConditionalButton

const styles = StyleSheet.create({})