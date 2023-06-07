
import {thunderstorm,dizzle, haze, rainy, snow, sunny ,clouds,tornado , bydefault} from './Images';

export const getDateFromUTC = (date) =>{
    var sec = date;
var date = new Date(sec * 1000);
var timestr = date.toLocaleTimeString();
return timestr
}
export const  getTodayDate=() =>{
  let now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
}
export const getTimeFromTimezone = (timezone) =>{
   return  new Date().toLocaleString("en-US", { timeZone: timezone , timeStyle :"medium" });
}
export const  dateMessage = (datearg) =>
 {
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    let year = datearg.getFullYear();
    let month = months[datearg.getMonth()]
    let date = datearg.getDate()
    let day = days[datearg.getDay()]

    return `${date} ${month} (${day}), ${year}`;
 }

 export const apikey = '6ab256a6cd7f1de9144e881ee82015c3'
 export const newsapikey = '69aee0db285c4d6a9cc48137aa1786db'
 export const getWeatherBackground = (weather) =>{
    console.log(weather)
   if(weather >= 200 && weather <= 299)
   {
    return thunderstorm;
   }
   if(weather >= 300 && weather <= 499 )
   {
    return dizzle;
   }
   if(weather >= 500 && weather <= 599)
   {
    return rainy;
   }
   if(weather >= 600 && weather <= 699)
   {
    return snow;
   }
   if(weather >=700 && weather <= 799)
   {
    if(weather == 781)
   {
    return tornado;
   }
   
    return haze;
   
 
   }
   if(weather == 800)
   {
    return sunny;
   }
   
  if(weather >= 801 && weather <= 900)
  {
    return clouds;
  }
  return bydefault;
 }

 export const getWeatherReport = (weather) =>{
   console.log(weather)
  if(weather >= 202 && weather <= 208)
  {
   return "Heavy Rain Stay Indoor";
  }
  if(weather >= 232 && weather <= 235 )
  {
   return "Thunderstorm With heavy drizzle";
  }
  if(weather == 781)
  {
   return "Danger Tornado Please Stay indoor";
  }
  if(weather == 804)
  {
   return "Chances of Rain Stay Indoor.";
  }
 
}