import React,{useEffect,useState} from 'react'
import {Text,ImageBackground,View,StyleSheet,Dimensions,ActivityIndicator,ScrollView,FlatList,Image,Linking, Button} from 'react-native';
import {
  thunderstorm,
  dizzle,
  haze,
  rainy,
  snow,
  sunny,
  clouds,
  tornado,
  bydefault,
} from './Images';
import NewsSearchbar from './NewsSearchbar';
import { getTodayDate } from './Helper';
import { newsapikey } from './Helper';
import NoInternet from './NoInternet';
import Checknetwork from './Checknetwork';
export const Favourite = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [refresh,setRefresh] = useState(0);
  const [newsData, setNewsData] = useState(null);
  const [isconnected,setIsconnected] = useState(false);
  const [loaded, setLoaded] = useState(false);
  async function fetchNewsData(searchkey) {
    setLoaded(true);
    const API = `https://newsapi.org/v2/everything?q=${searchkey}&from=${getTodayDate()}&to=${getTodayDate()}&sortBy=popularity&pageSize=20&apiKey=${newsapikey}`;
    try {
        const response = await fetch(API);
        if(response.status == 200) {
            const data = await response.json();
           setNewsData(data)
            console.log(newsData)
        } else {
            setNewsData(null)
        }
        setLoaded(false);
    setRefreshing(false);   
    } catch (error) {
        console.log(error);
    }
}
useEffect(() =>{
fetchNewsData(searchkey = "weather india");
},[])

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

  else if(newsData === null) {
return (
<View style={styles.container}>
  {
    isconnected ? <View>
      <NewsSearchbar fetchNewsData={fetchNewsData}/>
    <Text style={styles.primaryText}>News Not Found! Try Different search Word</Text>
    </View> : <NoInternet/>
  }
    
<Checknetwork isconnected={isconnected} setIsconnected={setIsconnected}/>

</View>
)
}
  return (

    <>

      {
        isconnected ?
         <ImageBackground
         source={bydefault}
         style={styles.backgroundImg}
         resizeMode="cover">
   
   <NewsSearchbar fetchNewsData={fetchNewsData}/>
   <ScrollView>
   {
     newsData && <View>
   <Text style={styles.aqiText}>{newsData.totalResults}TotalResults</Text>
  
   {
   newsData && newsData.articles.map((item) =>{
     return (
       <View key={item.title} style={styles.backgroundAqi}>
        {item.urlToImage && <Image
                   style={{height: 200, width: 200}}
                   source={{
                     uri: `${item.urlToImage}`,
                   }}
                 /> } 
       <Text style={styles.aqiText2}>
         {
           item.title
         }
       </Text>
       <Text>{item.description}</Text>
       <Text style={{color : 'blue'}}>Author:{item.author}</Text>
       <Text style={styles.aqiText}>Published At:{item.publishedAt}</Text>
       <Button title='Read more' onPress={()=>{Linking.openURL(`${item.url}`)}}/>
      
       </View>
     )
   })
   }
     </View>
    
   }
   
   </ScrollView>
         </ImageBackground> : <NoInternet style={{marginTop : '50%'}}/>
      }
      <Checknetwork isconnected={isconnected} setIsconnected={setIsconnected}/>
    </>
    
  
   
  )
}
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
    opacity: 0.9,
    backgroundColor: '#fff',
    margin: '2%',
    padding : '2%'
  },
  aqiText: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    marginTop : '2%',
    marginLeft : '2%'
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
    marginTop: 20,
    justifyContent: 'space-between',
    padding: 10,
  },
  Info1: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 10,
    borderRadius: 15,
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