import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator , Dimensions } from 'react-native';
import { apikey } from './Helper';
import SearchBar from './SearchBar';
import Weatherinfo from './Weatherinfo';
import Checknetwork from './Checknetwork';
import NoInternet from './NoInternet';
export const SearchPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [refresh,setRefresh] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [detailweatherData, setdetailWeatherData] = useState(null);
  const [isconnected,setIsconnected] = useState(false);
  const [loaded, setLoaded] = useState(false);
      async function fetchWeatherData(cityName) {
        setLoaded(true);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apikey}`;
        const API2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apikey}`
        try {
            const response = await fetch(API);
            const response2 = await fetch(API2);
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
            setLoaded(false);
        setRefreshing(false);

            
        } catch (error) {
            console.log(error);
        }
    }
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setRefresh(refresh+1);
      console.log("hello inside")
      // setTimeout(() => {
      // }, 2000);
    }, []);
    useEffect(() => {
        fetchWeatherData(city="mumbai");
    }, [refresh,refreshing])

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
                  <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
                </View> : <NoInternet/>
              }
                
          <Checknetwork isconnected={isconnected} setIsconnected={setIsconnected}/>

            </View>
        )
    }
     return (
        <View style={styles.container}>
          {
            isconnected ? <Weatherinfo weatherData={weatherData} fetchWeatherData={fetchWeatherData} detailweatherData={detailweatherData} searchBar={true} onRefresh={onRefresh} refreshing={refreshing}/> : <NoInternet/>
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


















// import React,{useState} from 'react'
// import {Text,View,ImageBackground,Dimensions , StyleSheet,TextInput,TouchableOpacity ,Image , ActivityIndicator} from 'react-native';
// import Checknetwork from './Checknetwork';
// import NoInternet from './NoInternet';
// const height = Dimensions.get('window').height;
// const width = Dimensions.get('window').width;
// import Icon from 'react-native-vector-icons/FontAwesome5';
// const d = new Date();
// const getDate = (time) =>{
//   var sec = time;
//   var date = new Date(sec * 1000);
//   var timestr = date.toLocaleTimeString();
//   return timestr
//   }
//   const getMyDate = (time) =>{
//     var sec = time;
//     var date = new Date(sec);
//     var timestr = date.toLocaleTimeString();
//     return timestr
//     }
// function datemessage(datearg)
//  {
//     let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
//     let months = ['January','February','March','April','May','June','July','August','September','October','November','December']

//     let year = datearg.getFullYear();
//     let month = months[datearg.getMonth()]
//     let date = datearg.getDate()
//     let day = days[datearg.getDay()]

//     return `${date} ${month} (${day}), ${year}`;
//  }
// export const SearchPage = () => {
//   const [isconnected,setIsconnected] = useState(false);
//    const [val, setVal] = useState("");
//    const [wdata,setData] = useState();
//    const [loading,setLoading] = useState(false);
//    const getData = async () =>{
//     try{
//       const da = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=6ab256a6cd7f1de9144e881ee82015c3`)
//       if(da)
//       {
//         let result = await da.json();
//         console.log(result);
//         setData(result)
//         setLoading(false)
//       }
//     }catch(error)
//     {
//       console.log(error)
//     }
  
//    }
//   return (
//     <>
//       <Checknetwork isconnected={isconnected} setIsconnected={setIsconnected}/>
         
// <View>
// {
//       isconnected ? <View>
//         <ImageBackground source={require("../assets/image1.jpg")} style={{ height : height , width : width}} imageStyle={{opacity : 0.7,backgroundColor : 'black'}}/>
//         <View style={style.container}>
//            <View style={style.srow}>
//             <TextInput style={style.search} placeholder='Enter city Name' onChangeText={(val) => setVal(val)} value={val}/>
//             <TouchableOpacity  onPress={() =>{
//               getData();
//               setLoading(true);
            
//             }}>
//             <Image source={require('../assets/download.png')} style={{height : 50 , width : 70 ,marginLeft : '2%'}}  />
//             </TouchableOpacity>
           
//               </View>
//               <View>
//               {
//                  wdata &&  (
//                  <View>
//                   <ActivityIndicator size="large" color="red" animating={loading}/>
  
//   <Text style={style.text}>{wdata?.name}({wdata.sys?.country})</Text> 
//   <Text style={style.text}>{datemessage(d)}</Text>
//   <View style={style.textContainer}>
       
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
//     <Text style={style.text}> {Math.round(wdata?.main.temp_min - 273.15)}°C(min)/{Math.round(wdata?.main.temp_max - 273.15)}°C(max)</Text> 
//     <View style={{flex : 1}}>
//           <View style={style.textContainernew}>
//             <Text style={style.textnew}>Humidity={wdata.main.humidity}%</Text>
//             <Text style={style.textnew}>Pressure={wdata.main.pressure}mbar</Text>
//             </View>
//           </View>
//           <View style={{flex : 1 , marginLeft : '5%'}}>
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
//             </View>
     
//                  </View>
//                )
//               }
//               </View>
//           </View>
//       </View> :  (<NoInternet/>)
//      }
// </View>
//     </>

    
//   )
// }
// const style = StyleSheet.create({
//   container : {
//     position : 'absolute',
//     flex : 1
//   },
//   textnew : 
//   {color : "#fff" ,textAlign : 'center' ,justifyContent: 'center', fontSize : 18 ,marginRight : '10%'},
//   textContainernew : {
//     flex : 1,
//     flexDirection : 'row',
//     textAlign : 'center' ,
//     justifyContent: 'center',
//     fontSize : 10,
//     fontWeight : 400
//  },
//   srow : {
//     flex : 1,
//     margin : '5%',
//     flexDirection : 'row'
//   },
//   search : {
//     backgroundColor : 'grey',
//      fontSize : 20,
//      fontWeight : '700',
//     width : '80%',
//     color : "red"
//   },
//   font : {
//     fontSize : 30,
//     color : 'red'
//   },
//   text : 
//   {color : "#fff" ,textAlign : 'center' ,justifyContent: 'center', fontSize : 30 ,marginLeft : '2%' ,marginBottom : '10%'},
// textContainer : {
//    flex : 1,
//    flexDirection : 'row',
//    textAlign : 'center' ,
//    justifyContent: 'center',
// },
// //  card : {
// //   flex : 1,
// //    backgroundColor : 'grey',
// //    opacity : 0.6,
// //    height : '900%',
// //    width : '60%',
// //    position : 'relative'
// //  },
// //  container : {
// //   height : 50,
// //   alignItems : 'center',
// //   // justifyContent : 'center',
// //   marginTop : '60%'
// // }

// })