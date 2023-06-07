import React,{useState,useEffect} from 'react'
import { View, TextInput, StyleSheet, Dimensions,TouchableOpacity,Image } from 'react-native';

     
const NewsSearchbar = ({fetchNewsData}) => {
    const [searchname, setSearchname] = useState('');
  return (
    <View>
 <View style={styles.searchBar}>
    <TextInput 
        placeholder='Enter Search Name.....'
        value={searchname}
        onChangeText={(text) => setSearchname(text)}
        style={{fontSize : 20}}
    />
    <TouchableOpacity  onPress={() =>{
     fetchNewsData(searchname)
    
    }}>
    <Image source={require('../assets/search.png')} style={{height : 50 , width : 50 ,marginLeft : '2%'}} 

    />
    </TouchableOpacity>
</View>
{/* <View style={styles.searchBar}>
    <TextInput 
        placeholder='Enter City Name.....'
        value={cityName}
        onChangeText={(text) => setCityName(text)}
        style={{fontSize : 20}}
    />
    <TouchableOpacity  onPress={() =>{
    //  fetchWeatherData(cityName)
    
    }}>
    <Image source={require('../assets/search.png')} style={{height : 50 , width : 50 ,marginLeft : '2%'}} 

    />
    </TouchableOpacity>
</View> */}
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
export default NewsSearchbar