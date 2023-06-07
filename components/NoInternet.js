import React from 'react'
import {Text,View,StyleSheet,Image} from 'react-native';
const NoInternet = () => {
  return (
    <View style={style.container}>
       <Image source={require ('../assets/no.png')}/>
       <Text style={{ fontWeight : "800", fontSize : 40, marginTop : 1}}>{false ? "Connected" : "No Internet Connection"}</Text>

       </View>
  )
}
const style = StyleSheet.create({
    text : 
      {color : "red" ,textAlign : 'center' ,justifyContent: 'center', fontSize : 30 ,marginLeft : '2%' ,marginBottom : '10%'},
    textContainer : {
       flex : 1,
       flexDirection : 'row',
       textAlign : 'center' ,
       justifyContent: 'center',
    },
     card : {
      flex : 1,
       backgroundColor : 'grey',
       opacity : 0.6,
       height : '900%',
       width : '60%',
       position : 'relative'
     },
     container : {
      height : 50,
      alignItems : 'center',
      justifyContent : 'center',
      marginTop : '50%'
  }
  })
export default NoInternet