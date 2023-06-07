import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import {getWeatherBackground, dateMessage, getDateFromUTC , getWeatherReport} from './Helper';

import {
  thunderstorm,
  dizzle,
  haze,
  rainy,
  snow,
  sunny,
  clouds,
  tornado,
  clearnight,
  bydefault,
} from './Images';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import SearchBar from './SearchBar';

let days1 = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let today = new Date();
function getAqiD(x) {
  if (x >= 1 && x <= 2) {
    return 'Good Weather';
  } else if (x >= 3 && x <= 4) {
    return 'Moderate Weather Condition Wear Mask';
  } else {
    return 'Poor Weather Stay Indoor';
  }
}
let x = today.getDay();
let names = new Array(5);
x = x + 1;
for (let i = 0; i < 5; i++) {
  if (x > 6) x = 0;
  if (x <= 6) {
    names[i] = x;
    x++;
  }
}
// audio = new audio('assets/rain.mp3')
const Weatherinfo = ({
  weatherData,
  fetchWeatherData,
  detailweatherData,
  searchBar,
  aqi,
  refreshing,
  onRefresh,
}) => {
  const [backgroundImage, setBackgroundImage] = useState(bydefault);
  const [time, setTime] = useState(null);
  const [ctime, setCtime] = useState();
  const getupdateTime = (time) => {
    if(time)
    {
      let update = new Date().toLocaleString('en-US', {
        timeZone: time.timeZone,
      });
      setCtime(update);
      // console.log("if inside")
      // if()
      // {
      //   // console.log("night time")
      //   setBackgroundImage(clearnight);
      // }
    }
    
  };
  const fetchLocalTime = async (lat, lon) => {
    try {
      const data = await fetch(
        `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`,
      );
      if (data.status == 200) {
        const timeData = await data.json();
        setTime(timeData);
        getupdateTime(time);
        console.log(time);
      } else {
        setTime(null);
      }
      if (time) {
        // setInterval(getupdateTime,1000);
        // getupdateTime()
      }
    } catch (error) {
      console.log(error);
    }
  };
  // setInterval(getupdateTime, 1000);
  useEffect(() => {
    setBackgroundImage(getWeatherBackground(weatherData.weather[0].id));
    if (weatherData.weather[0].main === 'rain') {
      ToastAndroid.show(
        'Heavy Showers Stay Indoor',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
    if (weatherData) {
      const lat = weatherData.coord.lat;
      const lon = weatherData.coord.lon;
      fetchLocalTime(lat, lon);
    }
    //    const val = getWeatherBackground(100);
    //    console.log(val)
  },[weatherData,refreshing,onRefresh,detailweatherData]);
  useEffect(() =>{
    getupdateTime(time);
  },[time])
  if(backgroundImage === sunny )
  {
     textColor = "black"
  }
  else if(backgroundImage === clearnight)
  {
    textColor = "white"
  }
  // let textColor = || (backgroundImage === clearnight) ? 'white' : 'black';
  return (
    <View style={styles.container}>
     <ImageBackground
        source={(weatherData.weather[0].main == "Clear") && (time?.hour >= 18 || time?.hour <=6 ) ? clearnight : backgroundImage}
        // source={rainy}
        style={styles.backgroundImg}
        resizeMode="cover">
        {searchBar ? <SearchBar fetchWeatherData={fetchWeatherData} /> : null}

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                ...styles.headerText,
                color: "skyblue",
                fontWeight: 'bold',
                fontSize: 46,
              }}>
              {weatherData?.name}({weatherData.sys?.country})
            </Text>
            <Text style={styles.text}>{dateMessage(new Date())}</Text>
            <View style={styles.textContainer}>
              <Image
                style={{height: 100, width: 150}}
                source={{
                  uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
                }}
              />
              <Text
                style={{
                  ...styles.headerText,
                  fontWeight: '800',
                  fontFamily: 'roboto',
                  fontSize: 60,
                  color: 'red',
                }}>
                {Math.round(weatherData?.main.temp)}°C
              </Text>
            </View>
            <Text
              style={{
                ...styles.headerText,
                color: "skyblue",
                fontWeight: 'bold',
              }}>
              {weatherData.weather[0]?.main}(
              {weatherData.weather[0]?.description})
            </Text>

            <Text style={styles.text}>
              {' '}
              {Math.round(weatherData?.main.temp_min)}°C(min)/
              {Math.round(weatherData?.main.temp_max)}°C(max)
            </Text>
          </View>

          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/humidity.png')}
                  style={{height: 30, width: 30}}
                />
                <Text style={{fontSize: 22, color: 'white'}}>Humidity</Text>
              </View>

              <Text style={{fontSize: 22, color: 'white', marginLeft: '20%'}}>
                {weatherData.main?.humidity} %
              </Text>
            </View>

            <View style={styles.info}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/wind.png')}
                  style={{height: 30, width: 30}}
                />
                <Text style={{fontSize: 22, color: 'white'}}>Wind Speed</Text>
              </View>
              <Text style={{fontSize: 22, color: 'white', marginLeft: '20%'}}>
                {weatherData.wind?.speed} m/s
              </Text>
            </View>
          </View>
          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/pressure-gauge.png')}
                  style={{height: 30, width: 30}}
                />
                <Text style={{fontSize: 22, color: 'white'}}>Pressure</Text>
              </View>

              <Text style={{fontSize: 22, color: 'white', marginLeft: '20%'}}>
                {weatherData.main?.pressure}mbar
              </Text>
            </View>

            <View style={styles.info}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/clear.png')}
                  style={{height: 30, width: 30}}
                />

                <Text style={{fontSize: 22, color: 'white'}}>Feels Like</Text>
              </View>

              <Text style={{fontSize: 22, color: 'white', marginLeft: '20%'}}>
                {Math.round(weatherData.main?.feels_like)}°C
              </Text>
            </View>
          </View>
          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <Text style={{fontSize: 22, color: 'white'}}>
                {weatherData.main?.sea_level ? 'Sea Level' : 'Visibility'}
              </Text>
              <Text style={{fontSize: 22, color: 'white'}}>
                {weatherData.main?.sea_level
                  ? weatherData.main?.sea_level
                  : weatherData?.visibility}{' '}
                metres
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={{fontSize: 22, color: 'white'}}>Wind degree</Text>
              <Text style={{fontSize: 22, color: 'white'}}>
                {Math.round(weatherData.wind?.deg)}°
              </Text>
            </View>
          </View>
          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/sunrise.png')}
                  style={{height: 30, width: 30}}
                />
                <Text style={{fontSize: 22, color: 'white'}}>Sunrise</Text>
              </View>
              <Text style={{fontSize: 22, color: 'white', marginLeft: '20%'}}>
                {getDateFromUTC(weatherData.sys?.sunrise)}
              </Text>
            </View>

            <View style={styles.info}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/sunset.png')}
                  style={{height: 30, width: 30}}
                />
                <Text style={{fontSize: 22, color: 'white'}}>Sunset</Text>
              </View>

              <Text style={{fontSize: 22, color: 'white', marginLeft: '20%'}}>
                {getDateFromUTC(weatherData.sys?.sunset)}
              </Text>
            </View>
          </View>
          <View style={styles.extraInfo1}>
            <ScrollView horizontal={true}>
              <View style={styles.Info1}>
                <Image
                  style={{height: 60, width: 60}}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${detailweatherData.list[0].weather[0].icon}@2x.png`,
                  }}
                />
                <Text style={{fontSize: 22, color: 'red'}}>
                  {days1[names[0]]}
                </Text>
                <Text style={{fontSize: 22, color: 'white', fontSize: 15}}>
                  {Math.round(detailweatherData.list[0].main.temp_min)}°C(min)/
                  {Math.round(detailweatherData.list[0].main.temp_max)}°C(max)
                </Text>
              </View>
              <View style={styles.Info1}>
                <Image
                  style={{height: 60, width: 60}}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${detailweatherData.list[3].weather[0].icon}@2x.png`,
                  }}
                />
                <Text style={{fontSize: 22, color: 'red'}}>
                  {days1[names[1]]}
                </Text>
                <Text style={{fontSize: 22, color: 'white', fontSize: 15}}>
                  {Math.round(detailweatherData.list[3].main.temp_min)}°C(min)/
                  {Math.round(detailweatherData.list[0].main.temp_max)}°C(max)
                </Text>
              </View>
              <View style={styles.Info1}>
                <Image
                  style={{height: 60, width: 60}}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${detailweatherData.list[5].weather[0].icon}@2x.png`,
                  }}
                />
                <Text style={{fontSize: 22, color: 'red'}}>
                  {days1[names[2]]}
                </Text>
                <Text style={{fontSize: 22, color: 'white', fontSize: 15}}>
                  {Math.round(detailweatherData.list[5].main.temp_min)}°C(min)/
                  {Math.round(detailweatherData.list[0].main.temp_max)}°C(max)
                </Text>
              </View>
              <View style={styles.Info1}>
                <Image
                  style={{height: 60, width: 60}}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${detailweatherData.list[8].weather[0].icon}@2x.png`,
                  }}
                />
                <Text style={{fontSize: 22, color: 'red'}}>
                  {days1[names[3]]}
                </Text>
                <Text style={{fontSize: 22, color: 'white', fontSize: 15}}>
                  {Math.round(detailweatherData.list[8].main.temp_min)}°C(min)/
                  {Math.round(detailweatherData.list[0].main.temp_max)}°C(max)
                </Text>
              </View>
              <View style={styles.Info1}>
                <Image
                  style={{height: 60, width: 60}}
                  source={{
                    uri: `https://openweathermap.org/img/wn/${detailweatherData.list[11].weather[0].icon}@2x.png`,
                  }}
                />
                <Text style={{fontSize: 22, color: 'red'}}>
                  {days1[names[4]]}
                </Text>
                <Text style={{fontSize: 22, color: 'white', fontSize: 15}}>
                  {Math.round(detailweatherData.list[11].main.temp_min)}°C(min)/
                  {Math.round(detailweatherData.list[0].main.temp_max)}°C(max)
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.backgroundAqi}>
            {aqi && (
              <>
                <View style={styles.flexRow}>
                  <View>
                    <AnimatedCircularProgress
                      size={120}
                      width={15}
                      style={{margin: 10}}
                      fill={aqi.list[0].main.aqi * 20}
                      tintColor="#00e0ff"
                      onAnimationComplete={() =>
                        console.log('onAnimationComplete')
                      }
                      backgroundColor="#3d5875"
                    />
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 50,
                        marginLeft: '10%',
                        fontWeight: '900',
                        marginBottom: '10%',
                      }}>
                      AQI:{aqi.list[0].main.aqi}
                    </Text>
                  </View>

                  <View style={{marginLeft: '3%'}}>
                    <Text style={styles.aqiText}>
                      Co:{aqi.list[0].components.co} μg/m3
                    </Text>
                    <Text style={styles.aqiText}>
                      No:{aqi.list[0].components.no} μg/m3
                    </Text>
                    <Text style={styles.aqiText}>
                      No2:{aqi.list[0].components.no2} μg/m3
                    </Text>
                    <Text style={styles.aqiText}>
                      O3:{aqi.list[0].components.o3} μg/m3
                    </Text>
                    <Text style={styles.aqiText}>
                      So2:{aqi.list[0].components.so2} μg/m3
                    </Text>
                    <Text style={styles.aqiText}>
                      PM2.5:{aqi.list[0].components.pm2_5} μg/m3
                    </Text>
                    <Text style={styles.aqiText}>
                      PM10:{aqi.list[0].components.pm10} μg/m3
                    </Text>
                    <Text style={styles.aqiText}>
                      NH3:{aqi.list[0].components.nh3} μg/m3
                    </Text>
                  </View>
                </View>

                <Image
                  source={require('../assets/mask.png')}
                  style={{height: 50, width: 50}}
                />
                <Text style={styles.aqiText2}>
                  {getAqiD(aqi.list[0].main.aqi)}
                </Text>
              </>
            )}
          </View>
          <View style={styles.backgroundAqi}>
            {time && (
              <View style={{marginLeft : '2%'}}>
                {/* <Text style={styles.aqiText2}>{time.day}/{time.month}/{time.year}</Text> */}
                {/* <Text>Local Time:{time.hour}:{time.minute}:{time.second}</Text> */}
                <Text style={styles.aqiText}>{time.timeZone}</Text>
              
                  
                <Text style={styles.timer}>Local Date and Time:{ctime}</Text>
                <Text style={styles.aqiText}>{time.dayOfWeek}</Text>

                {/* <Text>{setInterval(getTimeFromTimezone({time.timeZone}),1000)}</Text> */}
              </View>
               
            )}
          </View>
          <View style={styles.backgroundAqi}>
               
                  <View style={{marginLeft : '2%'}}>
                 <Text style={styles.aqiText}>Weather Warnings:</Text>
                    <Text style={styles.aqiText2}>{getWeatherReport(weatherData.weather[0].id) ? getWeatherReport(weatherData.weather[0].id) : "All Good" }</Text>
                  
    
                  
                  </View>
               </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
    opacity: 0.7,
    backgroundColor: 'black',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: '2%',
    justifyContent: 'space-between',
  },
  backgroundAqi: {
    flex: 1,
    width: Dimensions.get('screen').width - 20,
    opacity: 0.6,
    backgroundColor: 'lightgreen',
    margin: '2%',
  },
  aqiText: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
  },
  aqiText2: {
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
  },
  timer: {
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: 'row',
    // marginTop: 20,
    justifyContent: 'space-between',
    padding: 10,
  },
  extraInfo1: {
    flexDirection: 'row',
    marginTop: 20,
    // marginRight : 20,
    justifyContent: 'space-between',
    // padding: 10,
  },
  Info1: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 10,
    borderRadius: 15,
    // margin : '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'areial',
    fontSize: 20,
  },
  textContainer: {
    flexDirection: 'row',
    marginRight: '12%',
    // textAlign : 'center' ,
    // justifyContent: 'center',
    alignContent: 'space-between',
  },
});
export default Weatherinfo;
