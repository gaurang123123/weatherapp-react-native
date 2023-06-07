import React, { useState  } from 'react'
import { View, TextInput, StyleSheet, Dimensions,TouchableOpacity,Image } from 'react-native';
// import { EvilIcons } from '@expo/vector-icons'; 
// import SearchPage from './SearchPage';
// import Weatherinfo from './Weatherinfo';
export default function SearchBar({ fetchWeatherData }) {

    const [cityName, setCityName] = useState('');

    return (
        <View style={styles.searchBar}>
            <TextInput 
                placeholder='Enter City Name.....'
                value={cityName}
                onChangeText={(text) => setCityName(text)}
                style={{fontSize : 20}}
            />
            <TouchableOpacity  onPress={() =>{
             fetchWeatherData(cityName)
            
            }}>
            <Image source={require('../assets/search.png')} style={{height : 50 , width : 50 ,marginLeft : '2%'}} 
     
            />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: 'lightgray',
        borderColor: 'lightgray'
    }
})
