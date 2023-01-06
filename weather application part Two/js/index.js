var cityName=document.getElementById("search")
var btn=document.getElementById("btn")
var date=document.getElementById("date")
var city=document.getElementById("city");
var degree=document.getElementById("degree");
var feelTemp=document.getElementById("feelTemp");
var humidity=document.getElementById("humidity");
var windspeed=document.getElementById("windspeed");
var winddirection=document.getElementById("winddirection");
var pct=document.getElementById("pct");
var image=document.getElementById("image")
var pressure=document.getElementById("pressure")
var sunrise=document.getElementById("sunrise")
var sunset=document.getElementById("sunset")
var aqi=document.getElementById("aqi")
var comment=document.getElementById("comment")
var store

const optionsTwo = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5bcd1bee6fmsh35c448314c0e372p1a523fjsnfaff709f19ff',
        'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
    }
};
btn.addEventListener("click",()=>{
    var inputValue=cityName.value
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=5e354d366709c44523875f6bffdf2cd2`)
    .then(data=>{
        return data.json()
    })
    .then(res=>{
        console.log(res)
        city.innerHTML=res.name
        var icon=res.weather[0].icon
        image.innerHTML=`
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        `
        if(icon.includes("d")){
           document.getElementById("body").style.backgroundImage="url('../images/afternoon.jpeg')"
        }else if(icon.includes("10d") || icon.includes("10n")){
            document.getElementById("body").style.backgroundImage="url('../images/rain.gif')"

        }
        else{
            document.getElementById("body").style.backgroundImage="url('../images/nighttwo.jpeg')"
        }
        date.innerHTML=res.weather[0].main
        degree.innerHTML=Math.round(res.main.temp-273) 
        feelTemp.innerHTML=Math.round(res.main.feels_like-273) 
        humidity.innerHTML= res.main.humidity
        windspeed.innerHTML= Math.round(res.wind.speed * 3.6) 
        pct.innerHTML=res.clouds.all
        pressure.innerHTML=res.main.pressure
        if(res.wind.deg>=0 && res.wind.deg<=23 || res.wind.deg>=337 && res.wind.deg<=360){
            winddirection.innerHTML="N"
        }else if(res.wind.deg>=24 && res.wind.deg<=68){
            winddirection.innerHTML="NE"
        }else if(res.wind.deg>=69 && res.wind.degs<=113){
            winddirection.innerHTML="E"
        }else if(res.wind.deg>=114 && res.wind.deg<=158){
            winddirection.innerHTML="SE"
        }else if(res.wind.deg>=159 && res.wind.deg<=203){
            winddirection.innerHTML="S"
        }else if(res.wind.deg>=204 && res.wind.deg<=248){
            winddirection.innerHTML="SW"
        }else if(res.wind.deg>=294 && res.wind.deg<=336){
            winddirection.innerHTML="NW"
        }
        sunrise.innerHTML=new Date(res.sys.sunrise*1000).toLocaleTimeString()
        sunset.innerHTML=new Date(res.sys.sunset*1000).toLocaleTimeString()
        fetch(`https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${cityName.value}`, optionsTwo)
        .then(responseTwo => responseTwo.json())
        .then(responseTwo => {
            console.log(responseTwo)
            aqi.innerHTML=responseTwo.overall_aqi
            if(aqi.innerHTML>=0 && aqi.innerHTML<=33){
                comment.innerHTML="(Very good)"
            }else if(aqi.innerHTML>=34 && aqi.innerHTML<=66){
                comment.innerHTML="(Good)"
            }else if(aqi.innerHTML>=67 && aqi.innerHTML<=99){
                comment.innerHTML="(Fair)"
            }else if(aqi.innerHTML>=100 && aqi.innerHTML<=149){
                comment.innerHTML="(Poor)"
            }else if(aqi.innerHTML>=150 && aqi.innerHTML<=200){
                comment.innerHTML="(Very Poor)"
            }else if(aqi.innerHTML>=200){
                comment.innerHTML="(Hazardous)"
            }
        })
        .catch(err => console.error(err));
        
    })
})



