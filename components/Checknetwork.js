import React,{useEffect,useState} from 'react'
import {View,ToastAndroid , Text , StyleSheet, Image} from "react-native";

import NetInfo from "@react-native-community/netinfo";
const Checknetwork = ({isconnected ,setIsconnected}) => {
    // const [conn,setConn] = useState('');
    useEffect(() =>{
      setIsconnected(false)
  // Subscribe
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    state.isConnected == true ? setIsconnected(true) : setIsconnected(false)
    // setIsconnected(state.isConnected)
    // setIsconnected(true)
    // console.log(state)
  });

   return()=>  {unsubscribe();};
             

  
  // Unsubscribe
    },[]);
  
//   NetInfo.fetch().then(state => {
//     console.log("Connection type", state.type);
//     console.log("Is connected?", state.isConnected);
//   });
  return (
 <View>

 </View>
    //   isconnected != true ? (<View style={{ backgroundColor : "red"}}>
    //   <View style={style.container}>
    //    <Image source={require ('../assets/no.png')}/>
    //   <Text style={{ fontWeight : "800", fontSize : 40, marginTop : 1}}>{isconnected== true ? "Connected" : "No Internet Connection"}</Text>

    //   </View>
     
       
    // </View>) : 

    // }
    
  )
}
const style = StyleSheet.create({
  container : {
      height : 50,
      alignItems : 'center',
      // justifyContent : 'center',
      marginTop : '60%'
  }
})
export default Checknetwork