const userLocation= document.getElementById('userLocation')
const converter=document.getElementById("converter");
const weatherIcon=document.querySelector('.weatherIcon');
const temperature=document.querySelector('.temperature');
const feelsLike=document.querySelector('.feelsLike');
const description=document.querySelector('.description');
const date=document.querySelector('.date');
const city=document.querySelector('.city');

const Hvalue=document.getElementById('Hvalue');
const Wvalue=document.getElementById('Wvalue');
const Srvalue=document.getElementById('Srvalue');
const Ssvalue=document.getElementById('Ssvalue');
const Cvalue=document.getElementById('Cvalue');
const eyevalue=document.getElementById('eyeval');
const Pvalue=document.getElementById('Pvalue');
const forcast=document.querySelector('.forcast');

const search=document.getElementById('search');

let lon=null;
let lat=null;

WEATHER_API_ENDPOINT="https://api.openweathermap.org/data/2.5/weather?appid=2b58bf02054a84b784f6026c58b7967c&q=";
WEATHER_DATA_ENDPOINT="https://api.openweathermap.org/data/2.5/weather?appid=2b58bf02054a84b784f6026c58b7967c&exclude=minutely&units=metric&";
search.addEventListener('click',()=>{
         fetch(WEATHER_API_ENDPOINT+userLocation.value)
         .then((response)=>{
            return response.json();
         })
         .then((data)=>{
            if(data.cod !='' && data.cod !=200){
                alert("Enter your location");
                return;
            }
            lat=data.coord.lat;
            lon=data.coord.lon;
            fetch(WEATHER_DATA_ENDPOINT+`lat=${lat}&lon=${lon}`)
            .then((response)=>{
                return response.json();
            })
            .then((data)=>{
                console.log(data);
                Hvalue.innerHTML=`${Math.round(data.main.humidity)}<span style="font-size:0.9rem">%</span>`;
                Wvalue.innerHTML=`${Math.round(data.wind.speed)}<span style="font-size:0.9rem">kmph</span>`;
                Pvalue.innerHTML=`${data.main.pressure}<span style="font-size:0.9rem">hPa</span>`;
                temperature.innerHTML=`<h1>${tempConverter(data.main.temp)}</h1>`;
                city.innerHTML=`${data.name},${data.sys.country}`;
                weatherIcon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`
                feelsLike.innerHTML=`feels like ${tempConverter(data.main.feels_like)}`;
                Cvalue.innerHTML=`${data.clouds.all}<span style="font-size:0.9rem">%</span>`;
                description.innerHTML=`${data.weather[0].description}`;
                eyevalue.innerHTML=`${data.visibility/1000}<span style="font-size:0.9rem">km</span>`;
                const option={
                     hour:"numeric",
                     minute:"numeric",
                     hour12:true,
                }
                Srvalue.innerHTML=getLongFormateTime(data.sys.sunrise,data.timezone,option);
                Ssvalue.innerHTML=getLongFormateTime(data.sys.sunset,data.timezone,option);
                const option1={
                    weekday:"long",
                    month:"long",
                     hour:"numeric",
                     minute:"numeric",
                     hour12:true,
                }
                date.innerHTML=getLongFormatDate(data.dt,data.timezone,option1);
            })
         })
});

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        fetch(WEATHER_DATA_ENDPOINT + `lat=${lat}&lon=${lon}`)
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
                Hvalue.innerHTML=`${Math.round(data.main.humidity)}<span style="font-size:0.9rem">%</span>`;
                Wvalue.innerHTML=`${Math.round(data.wind.speed)}<span style="font-size:0.9rem">kmph</span>`;
                Pvalue.innerHTML=`${data.main.pressure}<span style="font-size:0.9rem">hPa</span>`;
                temperature.innerHTML=`<h1>${tempConverter(data.main.temp)}</h1>`;
                city.innerHTML=`${data.name},${data.sys.country}`;
                weatherIcon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`
                feelsLike.innerHTML=`feels like ${tempConverter(data.main.feels_like)}`;
                Cvalue.innerHTML=`${data.clouds.all}<span style="font-size:0.9rem">%</span>`;
                description.innerHTML=`${data.weather[0].description}`;
                eyevalue.innerHTML=`${data.visibility/1000}<span style="font-size:0.9rem">km</span>`;
                const option={
                     hour:"numeric",
                     minute:"numeric",
                     hour12:true,
                }
                Srvalue.innerHTML=getLongFormateTime(data.sys.sunrise,data.timezone,option);
                Ssvalue.innerHTML=getLongFormateTime(data.sys.sunset,data.timezone,option);
                const option1={
                    weekday:"long",
                    month:"long",
                     hour:"numeric",
                     minute:"numeric",
                     hour12:true,
                }
                date.innerHTML=getLongFormatDate(data.dt,data.timezone,option1);
          });
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  } 
  else {
    console.error("Geolocation is not supported by this browser.");
  }
});

function formatUnixTime(dtValue,offset,options={}){
    const date=new Date((dtValue+offset)*1000);
    return date.toLocaleTimeString([],{timeZone:"UTC",...options});
}

function getLongFormateTime(dtValue,offset,options){
    return formatUnixTime(dtValue,offset,options);
}

function formatUnixDate(dtValue,offset,options={}){
    const date=new Date((dtValue+offset)*1000);
    return date.toLocaleDateString([],{timeZone:"UTC",...options});
}

function getLongFormatDate(dtValue,offset,options){
        return formatUnixDate(dtValue,offset,options); 
}

function tempConverter(temp){
     let tempVal=Math.round(temp);
     if(converter.value=="celcius"){
        return temp+"°C";
     }
     else if(converter.value=="fahrenheit"){
        temp=(temp*1.8)+32;
        temp=Math.round(temp);
        return temp+"°F";
     }
}
