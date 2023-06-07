import { Alert, Text,View,ToastAndroid, ActivityIndicator,StyleSheet, Button } from "react-native";
import React,{useState ,useEffect} from 'react'
import { apikey } from "./Helper";
import Geolocation from '@react-native-community/geolocation';
import Checknetwork from "./Checknetwork";
import NoInternet from "./NoInternet";
import Weatherinfo from "./Weatherinfo";
const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [detailweatherData, setdetailWeatherData] = useState(null);
  const [aqi,setAqi] = useState(null);
  const [isconnected,setIsconnected] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [refresh,setRefresh] = useState(0);
  async function fetchWeatherData(lat,lon) {
    console.log(lat);
    console.log(lon);
    if(lat == null && lon == null)
    {
      Alert.alert('Warning' , 'Location Details Not fetched Please turn on Location',[
        {text : 'Ok'},
        {text : 'cancel'},
      ])
    }
    // http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}
// // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
    const API2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
    const API3 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`
    try {
        const response = await fetch(API);
        const response2 = await fetch(API2);
        const response3 = await fetch(API3);
        if(response.status == 200) {
            const data = await response.json();
            setWeatherData(data);
            console.log(weatherData)
        } else {
            setWeatherData(null);
        }
        if(response2.status == 200)
        {
          const detaildata = await response2.json();
          setdetailWeatherData(detaildata);
          console.log(detailweatherData);

        }else{
          setdetailWeatherData(null)
        }
        if(response3.status == 200)
        {
          const aqidata = await response3.json();
           setAqi(aqidata)
          console.log(aqi);

        }else{
          setAqi(null)
        }
        setLoaded(false);
        
    } catch (error) {
        console.log(error);
    }
};
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh(refresh+1);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
useEffect(() =>{
      try{
     const loc =  Geolocation.getCurrentPosition((data,error) => 
          {
            if(data)
            {
              // console.log("data")
              // console.log(data)
              const lat = data.coords.latitude;
              const lon = data.coords.longitude;
             
              ToastAndroid.show("Location Fetched Successfully",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
              )
              setLoaded(true);
              fetchWeatherData(lat,lon);
            }else if(data.PERMISSION_DENIED == 1){
              Alert.alert('Warning' , 'Location Details Not fetched Please turn on Location',[
                {text : 'Ok'},
                {text : 'cancel'},
              ])
              console.log("Something went wrong")
            }
          })
      }catch(error){
        // console.log(error);
        ToastAndroid.show("Unable to Connect to Location",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
        )
       console.warn(error)
      }
},[refresh,refreshing])
if(loaded) {
  return (
      <View style={styles.container}>
   {
    isconnected ?    <ActivityIndicator color='gray'  size={80} /> : <NoInternet/>
   }
       
<Checknetwork isconnected={isconnected} setIsconnected={setIsconnected}/>

      </View>

  )
}

  else if(weatherData === null) {
return (
<View style={styles.container}>
  {
    isconnected ? <View>
    <Text style={styles.primaryText}>City Not Found! Something Went Wrong Check your Location.</Text>
    <Button title="Reload" style={{fontSize : 30}} onPress={() => {setRefresh(refresh+1)}}></Button>
    </View> : <NoInternet/>
  }
    
<Checknetwork isconnected={isconnected} setIsconnected={setIsconnected}/>

</View>
)
}
return (
<View style={styles.container}>
{
isconnected ? <Weatherinfo weatherData={weatherData} fetchWeatherData={fetchWeatherData} detailweatherData={detailweatherData} searchBar={false} aqi={aqi} onRefresh={onRefresh} refreshing={refreshing} /> : <NoInternet/>
}
<Checknetwork isconnected={isconnected} setIsconnected={setIsconnected}/>

</View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
      margin: 20,
      fontSize: 28
  }
});
export default Home;



// import React from 'react';
// import {
//   RefreshControl,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
// } from 'react-native';

// const App = () => {
//   const [refreshing, setRefreshing] = React.useState(false);

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 2000);
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollView}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }>
//         <Text>Pull down to see RefreshControl indicator</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//     backgroundColor: 'pink',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default App;


// import React, { useState , useEffect} from 'react'
// import {Text,View , ImageBackground , Dimensions ,Button,ToastAndroid, Image ,StyleSheet, ScrollView} from 'react-native';
// import Checknetwork from './Checknetwork';
// import Geolocation from '@react-native-community/geolocation';
// import NoInternet from './NoInternet';
// import { dateMessage } from './Helper';
// // import  {} from '../assets/image1';
// import { apikey } from './Helper';
// const d = new Date();
// const height = Dimensions.get('window').height;
// const width = Dimensions.get('window').width;
// export const Home = () => {
//   const [isconnected,setIsconnected] = useState(false);
//   const [wdata,setWdata] = useState();
//   const [aqi,setAqi] = useState();
//     const getweatherData = async (lat,lon) =>{
      
//        console.log("inside",lat,lon)
//        try{
//         let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
//         let aq = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`)
//         if(aq)
//         {
//           res = await aq.json();
//           console.log(res);
//           setAqi(res);
//         }
//         if(data)
//         {
//          data = await data.json();
       
//          console.log(data);
        
//          setWdata(data)
//         }
//         else{
//          console.log(data)
//         }
//        }catch(error){
//         console.log(error)
//        }  
//   }
//     useEffect(() =>{
//       try{
//          Geolocation.getCurrentPosition((data,error) => 
//           {
//             if(data)
//             {
//               console.log("data")
//               console.log(data)
//               const lat = data.coords.latitude;
//               const lon = data.coords.longitude;
//               // ToastAndroid.BOTTOM("Find")
//               ToastAndroid.show("Location Fetched Successfully",
//               ToastAndroid.SHORT,
//               ToastAndroid.BOTTOM
//               )
//               getweatherData(lat,lon)
//             }else if(error){
//               console.log("Something went wrong")
//             }
//           })
//       }catch(error){
//         // console.log(error);
//         ToastAndroid.show("Unable to Successfully",
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM
//         )
//        console.warn(error)
//       }
 
//   },[])
//   // const [img,setImage] = useState('image1');
//   return (
//     <>
//     <Checknetwork isconnected={isconnected} setIsconnected={setIsconnected} />

//      <View>
//     {
//       isconnected ?  <View>
//                 <ImageBackground source={require("../assets/image1.jpg")} style={{ height : height , width : width}} imageStyle={{opacity : 0.7,backgroundColor : 'black'}}/>
//        {wdata && (
      
//        <View style={{position : 'absolute' ,marginLeft : '1%' ,marginTop: '10%' }}>
//         <Text style={style.text}>{wdata?.name}({wdata.sys?.country})</Text> 
//        <Text style={style.text}>{dateMessage(d)}</Text>
//        <View style={style.textContainer}>
       
//        <Image
//         style={{height : 100 , width : 150}}
//         source={{
//           uri: `https://openweathermap.org/img/wn/${wdata.weather[0].icon}@2x.png`,
//         }}
//       />
//       <Text style={{fontSize : 60 , shadowColor : 'grey' , color : 'red' , marginLeft : '8%' ,fontWeight : '900'}}>
       
//        {Math.round(wdata?.main.temp - 273.15)}°C
//          </Text>

//        </View>
//        <Text style={style.text}>{wdata?.weather[0].main}({wdata.weather[0].description})</Text>
//        <Text style={style.text}>Feels Like=
//         {Math.round(wdata?.main.feels_like - 273.15)}°C
//     </Text>
//        <Text style={style.text}> {Math.round(wdata?.main.temp_min - 273.15)}°C(min)/{Math.round(wdata?.main.temp_max - 273.15)}°C(max)</Text>
//         <View style={{flex : 1}}>
//           <View style={style.textContainernew}>
//             <Text style={style.textnew}>Humidity={wdata.main.humidity}%</Text>
//             <Text style={style.textnew}>Pressure={wdata.main.pressure}mbar</Text>
//             </View>
//           </View>
//           <View style={{flex : 1 , justifyContent : 'center',alignItems : 'center', marginLeft : '5%'}}>
//           <View style={style.textContainernew}>
//             <Text style={style.textnew}>Wind Speed={wdata.wind.speed}m/s</Text>
//             <Text style={style.textnew}>Height={wdata.main.sea_level}M
//             </Text>
//             </View>
//             <View style={style.textContainernew}>
//             <Text style={style.textnew}>Sunrise={getDate(wdata.sys.sunrise)}</Text>
//             <Text style={style.textnew}>Sunset={getDate(wdata.sys.sunset)}
//             </Text>
//             </View>
//             <View style={style.textContainernew}>
//               {
//                 wdata && <Text  style={style.textnew}>id:{(aqi.list[0].main.aqi)} {(aqi.weather[0].id) > 3 ? "Poor Weather Wear Mask" : "Normal Weather"}</Text>
//               }
//             </View>
//             <View style={style.textContainernew}>
//               {
//                 aqi && <Text  style={style.textnew}>AQI:{(aqi.list[0].main.aqi)} {(aqi.list[0].main.aqi) > 3 ? "Poor Weather Wear Mask" : "Normal Weather"}</Text>
//               }
//             </View>
//           </View>
//         </View>
       
//         )}
        
        
      
//              </View> :   ( <NoInternet/>
//     )  
//     }

// {/* <Button title='Click'></Button> */}


//    </View>
//     </>
  
//   )
// }

// const style = StyleSheet.create({
//   text : 
//     {color : "#fff" ,textAlign : 'center' ,justifyContent: 'center', fontSize : 30 ,marginBottom : '10%'},
//     textnew : 
//     {color : "#fff" ,textAlign : 'center' ,justifyContent: 'center', fontSize : 18 ,marginRight : '10%'},
//   textContainer : {
//      flex : 1,
//      flexDirection : 'row',
//     //  textAlign : 'center' ,
//      justifyContent: 'center',
//      alignContent : 'space-between'
//   },
//   textContainernew : {
//     flex : 1,
//     flexDirection : 'row',
//     textAlign : 'center' ,
//     justifyContent: 'center',
//     fontSize : 10,
//     fontWeight : 400
//  },
//    card : {
//     flex : 1,
//      backgroundColor : 'grey',
//      opacity : 0.6,
//      height : '100%',
//      width : '60%',
//      position : 'relative'
//    },
//    container : {
//     height : 50,
//     alignItems : 'center',
//     // justifyContent : 'center',
//     marginTop : '60%'
// }
// })

   
//       // <Text>Connected</Text>
// //      
//     // ): null
    

