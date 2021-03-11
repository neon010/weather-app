const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const searchData = document.getElementById("searched-result")
const errorMsg = document.getElementById("error");
const getWeather = document.getElementById("get-weather");



window.onload = () => {
    if(!navigator.geolocation){
        getWeather.innerHTML = `<p>Browser does not support geolocation</p>`
    }else{
        navigator.permissions.query({ name: 'geolocation' }).then((result)=>{
            if(result.state === "denied"){
                getWeather.innerHTML= `<p>Geolocation is denied by browser. Please give access to location</p>`
            }else{
                navigator.geolocation.getCurrentPosition((position) =>{
                    const url = `https://api.weatherstack.com/current?access_key=1d5e2e008d42c7c55663e54842d39575&query=${position.coords.latitude},${position.coords.longitude}&units=m`
                    fetch(url).then(res=>res.json()).then(result=> {
                        if(!result){
                            getWeather.innerHTML= `<p>Loading....</p>`
                        }else{
                            if(result.error){
                                getWeather.innerHTML= `<p>${result.error}</p>`
                            }else{
                                getWeather.innerHTML = `<div>
                                                        <p class="location">${result.location.name}, ${result.location.region},${result.location.country}</p>
                                                    </div>
                                                    <div class="get-weather-data">
                                                        <div class="row">
                                                            <div class="column">
                                                                <img src=${result.current.weather_icons[0]} alt="weather-Icon"/>
                                                                <p>${result.current.weather_descriptions[0]}</p>
                                                            </div>
                                                            <div class="column"> 
                                                                <p><span class="temp-value">${result.current.temperature}</span><span class="temp-type">&#8451;</span></p>
                                                            </div>
                                                        </div>
                                                        <div class="horizontal-data">
                                                            <p>Feels Like: <span class="large-font">${result.current.feelslike}&#8451;</span></p>
                                                            <p>Precipitation: <span class="large-font">${result.current.precip}</span</p>
                                                            <p>Humidity: <span class="large-font">${result.current.humidity}</span></p>
                                                            <p>Wind: <span class="large-font">${result.current.wind_speed} km/hr <span>${result.current.wind_dir}</span></span></p>
                                                        </div>
                                                    </div>`
                            }
                        }
                    }
                    );
                }
                )
            };
        })
    }
}



weatherForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    fetch(`/weather?address=${search.value}`)
    .then(res=>res.json()).then(data=>{
        if(data.error){
            getWeather.innerHTML = data.error
        }else{
            getWeather.innerHTML = `<div>
            <p class="location">${data.location}</p>
        </div>
        <div class="get-weather-data">
            <div class="row">
                <div class="column">
                    <img src=${data.forecastdata.weather_icons} alt="weather-Icon"/>
                    <p>${data.forecastdata.weather_descriptions[0]}</p>
                </div>
                <div class="column"> 
                    <p><span class="temp-value">${data.forecastdata.temp}</span><span class="temp-type">&#8451;</span></p>
                </div>
            </div>
            <div class="horizontal-data">
                <p>Feels Like: <span class="large-font">${data.forecastdata.feelslike}&#8451;</span></p>
                <p>Precipitation: <span class="large-font">${data.forecastdata.precip}</span></p>
                <p>Humdity: <span class="large-font">${data.forecastdata.humidity}</span></p>
                <p>Wind: <span class="large-font">${data.forecastdata.wind_speed} km/hr <span>${data.forecastdata.wind_dir}</span></span></p>
            </div>
        </div>`
            // searchData.innerHTML = `<div>
            //                             <p>You searched for: ${data.location}</p>
            //                         </div>
            //                         <div class="searched-weather">
            //                             <div class="column" id="weather-Icon">
            //                                 <img src=${data.forecastdata.weather_icons} alt="weather-Icon"/>
            //                                 <p>${data.forecastdata.weather_descriptions[0]}</p>
            //                             </div>
            //                             <div class="column"> 
            //                                 <p><span class="">${data.forecastdata.temp}</span><span>C | F</span></p>
            //                             </div>
            //                             <div class="column">
            //                                 <p>Feels Like: ${data.forecastdata.feelslike} <span>C<span></>
            //                                 <p>Precipitation: ${data.forecastdata.precip}</p>
            //                                 <p>Humidity: ${data.forecastdata.humidity}</p>
            //                                 <p>Wind: ${data.forecastdata.wind_speed} km/hr <span>${data.forecastdata.wind_dir}<span></p>
            //                             </div>
            //                         </div>

            //                         `
        }
    });
});




