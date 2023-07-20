import { Text, useWindowDimensions, View, StyleSheet, Alert, Pressable, Platform } from 'react-native' 
import React from 'react'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import Homepage from './screens/Homepage';
import Login from './screens/authScreens/Login';
import FindProperty from './screens/authScreens/FindProperty';
import PropertySearchResult from './screens/authScreens/PropertySearchResult';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Header, SearchBar } from 'react-native-elements';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import Portfolio from './screens/Portfolio';
import Details from './screens/Details';
import Manage from './screens/Manage';
import Alerts from './screens/Alerts';
import Report from './screens/Report';
import Header from './components/navigation/Header';
import SignUp from './screens/authScreens/SignUp';
import Owners from './screens/detailsScreens/Owners';
import AddDetails from './screens/detailsScreens/AddDetails';
import ManageDetails from './screens/detailsScreens/ManageDetails';
import StartDetails from './screens/detailsScreens/StartDetails';
import ByLocations from './screens/detailsScreens/ByLocations';
import ByObject from './screens/detailsScreens/ByObject';
import ByRoomsAndFloors from './screens/detailsScreens/ByRoomsAndFloors';
import ConfirmClaim from './screens/authScreens/ConfirmClaim';
import PropertySetup from './screens/authScreens/PropertySetup';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

// import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';

const DetailsStack = createNativeStackNavigator();

const DetailsStackNavigator = () => {
  return (
    <DetailsStack.Navigator>
      {/* <DetailsStack.Screen options={{ headerShown: false }}  name="Details" component={Details} /> */}
      <DetailsStack.Screen options={{ headerShown: false }}  name="StartDetails" component={StartDetails} />
      <DetailsStack.Screen options={{ headerShown: false }}  name="Owners" component={Owners} />
      {/* add details == by category */}
      <DetailsStack.Screen options={{ headerShown: false }}  name="AddDetails" component={AddDetails} />
      <DetailsStack.Screen options={{ headerShown: false }}  name="ByObject" component={ByObject} />
      <DetailsStack.Screen options={{ headerShown: false }}  name="ByLocations" component={ByLocations} />
      <DetailsStack.Screen options={{ headerShown: false }}  name="ByRoomsAndFloors" component={ByRoomsAndFloors} />
      <DetailsStack.Screen options={{ headerShown: false }}  name="ManageDetails" component={ManageDetails} />
  </DetailsStack.Navigator>
  )
  }
function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Homepage}/>
    </Drawer.Navigator>
  );
}

const BottomTabNavigator = () => (
  <Tab.Navigator
  screenOptions={{
    tabBarStyle: { height: 80, paddingBottom: 10},
  }}
  >
    {/* <Tab.Screen options={{ headerShown: false }} name="FindProperty" component={FindProperty} /> */}
    <Tab.Screen 
      options={{ 
        headerShown: false,   
        tabBarLabel: 'Portfolio',
        tabBarLabelStyle: {fontSize: 15},
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="house" size={30} color="black" />), 
      }} 
      name="Portfolio" 
      component={Portfolio} 
    />

     <Tab.Screen 
      options={{ 
        headerShown: false,   
        tabBarLabel: 'Details',
        tabBarLabelStyle: {fontSize: 15},
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="file-plus" size={30} color="black" />), 
      }} 
      name="Details" 
      component={DetailsStackNavigator} 
    />

     <Tab.Screen 
      options={{ 
        headerShown: false,   
        tabBarLabel: 'Manage',
        tabBarLabelStyle: {fontSize: 15},
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="calendar-month" size={30} color="black" />
        ), 
      }} 
      name="Manage" 
      component={Manage} 
    />

     <Tab.Screen 
      options={{ 
        headerShown: false,   
        tabBarLabel: 'Report',
        tabBarLabelStyle: {fontSize: 15},
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="file-document" size={30} color="black" />
        ), 
      }} 
      name="Report" 
      component={Report} 
    />

    <Tab.Screen 
      options={{ 
        headerShown: false,   
        tabBarLabel: 'Alerts',
        tabBarLabelStyle: {fontSize: 15},
        tabBarIcon: ({ color, size }) => (
          <Foundation name="alert" size={24} color="black" />          ), 
      }} 
      name="Alerts" 
      component={Alerts} 
    />

  </Tab.Navigator>
);



const HomeStack = () => {
  const [search, setSearch] = React.useState<string>('');

  return (
    <NavigationContainer independent={true}>
      <Header/>
    <Stack.Navigator >
      <Stack.Screen options={{ headerShown: false, }}   name="MainTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>

  )
}

const DrawerStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Manage" component={Manage} />
        <Drawer.Screen name="Report" component={Report} />
        <Drawer.Screen name="Alerts" component={Alerts} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const AuthenticationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="PropertySetup" component={PropertySetup} />
      <Stack.Screen options={{ headerShown: false }} name="FindProperty" component={FindProperty} />

        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="ConfirmClaim" component={ConfirmClaim} />
       

        <Stack.Screen options={{ headerShown: false }} name="PropertySearchResult" component={PropertySearchResult} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <>
      {isAuthenticated ? <HomeStack /> : <AuthenticationStack /> }
    </>
  )
}

export default Navigation



const styles = StyleSheet.create({

  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  userInfoView: {
    marginTop: 100
  },
  usernameText: {
    // fontFamily: 'Regular',
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center'
   
  },
  userEmailText: {
    // fontFamily: 'Regular',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 70
  },
  menuItemsText: {
    // fontFamily: 'Regular',
    fontSize: 16,
   
  },
  menuTextContainer: {
    display: 'flex',
    width: 230,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  }

});