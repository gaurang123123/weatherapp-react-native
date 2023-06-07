import React, { useState } from 'react'
import {Text, View,StyleSheet,Image,TextInput,TouchableOpacity,Dimensions,Alert,Button} from 'react-native';
import Downloader from './Downloader';
export const More = () => {
  const [number,setNumber] = useState(null);
  const [count,setCount] = useState(1);
    const guessNumber = () =>{
      if(number > 10)
      {
        Alert.alert('Warning' , 'Number greater than 10, please enter between 1 to 10',[
          {text : 'Ok' , onPress : () => {}},
          {text : 'cancel'},
        ])
      }
      else{
        if(count<=5)
        {
          let num = Math.floor(Math.random()*10);
          if(num == number)
          {
            Alert.alert('Hurry' , `Got the right number Entered number is ${number} and matched number is ${num}`,[
              {text : 'Ok' , onPress : () => {}},
              {text : 'cancel'},
            ])
            setCount(6);
          }else{
            Alert.alert('No Match' , 'Try Again',[
              {text : 'Ok' , onPress : () => {}},
              {text : 'cancel'},
            ])
            setCount(count+1)
            setNumber(null);
          }
        }else{
          Alert.alert('Game over' , `You have cross the limit`,[
            {text : 'Ok' , onPress : () => {}},
            {text : 'cancel'},
          ])
          setNumber(null)
        }
      }
    }
  return (
    <View>
    <Text style={styles.text}>Guess The number game...</Text>
    <Text style={styles.text2}>Numer of chances Left {6-count}</Text>
    <View style={styles.searchBar}>
            <TextInput 
                placeholder='Enter your No between 1 to 10.....'
                value={number}
                keyboardType='number-pad'
                onChangeText={(text) => setNumber(text)}
                style={{fontSize : 20}}
            />
            <TouchableOpacity  onPress={() =>{
              
            guessNumber()

            
            }}>
            <Image source={require('../assets/search.png')} style={{height : 50 , width : 50 ,marginLeft : '2%'}} 
     
            />
            </TouchableOpacity>
        </View>
        <View style={{ height : '20%'}}>
        <Button fontSize="20" title="Play Again" onPress={() => {setCount(1),setNumber(null)}}></Button>

        </View>
        <Downloader/>
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
  },
  text : {
    color : 'red',
    fontSize : 40,
    alignContent : 'center',
    justifyContent : 'center',
    margin : '4%'
  },
  text2 : {
    color : 'blue',
    fontSize : 30,
    alignContent : 'center',
    justifyContent : 'center',
    margin : '4%'
  }
})