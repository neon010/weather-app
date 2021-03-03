const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationMsg = document.getElementById("location");
const msgBar = document.getElementById("msgBar");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feels-like");
const errorMsg = document.getElementById("error");

weatherForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    fetch(`/weather?address=${search.value}`)
    .then(res=>res.json()).then(data=>{
        if(data.error){
            errorMsg.innerText = data.error
        }else{
            msgBar.style.display = "block";
            locationMsg.innerText = data.location
            temperature.innerText = data.forecastdata.temp
            feelsLike.innerText = data.forecastdata.feelslike
        }
    });

})


