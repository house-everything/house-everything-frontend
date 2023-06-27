import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './Navigation'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme, View, Text } from 'react-native'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default function App() {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <PaperProvider theme={theme}>
      
      <Navigation/>
    </PaperProvider>
    </GestureHandlerRootView>
  )

}
