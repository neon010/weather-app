const request = require("postman-request");

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1d5e2e008d42c7c55663e54842d39575&query=${lat},${long}&units=m`;

    request({url:url, json:true},(error, response) => {
        if(error) {
            callback("Unable to connect weather service", undefined)
        }else if(response.body.error){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined,{
                temp: response.body.current.temperature, 
                feelslike:response.body.current.feelslike,
                precip:response.body.current.precip,
                humidity:response.body.current.humidity,
                wind_speed:response.body.current.wind_speed,
                wind_dir:response.body.current.wind_dir,
                weather_descriptions:response.body.current.weather_descriptions,
                weather_icons:response.body.current.weather_icons,
            });
        };
    });
};
module.exports = forecast;