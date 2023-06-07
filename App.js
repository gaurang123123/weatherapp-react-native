// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import React,{useState,useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home';
import { SearchPage } from './components/SearchPage';
import { Favourite } from './components/Favourite';
import { More } from './components/More';
import Checknetwork from './components/Checknetwork';

import Geolocation from '@react-native-community/geolocation';
// // https://api.openweathermap.org/data/2.5/weather?q=mathura&appid=6ab256a6cd7f1de9144e881ee82015c3
// http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}
// // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// https://openweathermap.org/img/wn/10d@2x.png
// https://newsapi.org/v2/everything?q=apple&from=2023-06-01&to=2023-06-01&sortBy=popularity&apiKey=69aee0db285c4d6a9cc48137aa1786db

// https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=69aee0db285c4d6a9cc48137aa1786db
// https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam   
// https://timeapi.io/api/Time/current/coordinate?latitude=38.9&longitude=-77.03
const Tab = createMaterialTopTabNavigator();
const App = () =>{
  return (
    <>
    <StatusBar backgroundColor={'blue'}/>
<NavigationContainer>


<Tab.Navigator screenOptions={{
    tabBarLabelStyle: { fontSize: 14 , color : 'white' },
    tabBarItemStyle: { width: 100 },
    tabBarStyle: { backgroundColor: 'blue' },
  }} >
    <Tab.Screen  name="Home" component={Home}/>
    <Tab.Screen name="Search" component={SearchPage}/>
    <Tab.Screen name="Favourite" component={Favourite}/>
    <Tab.Screen name="More" component={More}/>


  </Tab.Navigator>
</NavigationContainer>

</>
 
  )
}

export default App;
