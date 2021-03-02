const request = require("postman-request");

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1d5e2e008d42c7c55663e54842d39575&query=${lat},${long}&units=f`;

    request({url:url, json:true},(error, response) => {
        if(error) {
            callback("Unable to connect weather service", undefined)
        }else if(response.body.error){
            callback("Unable to find location", undefined)
        }else{
            const data = response.body.current
            callback(undefined,{temp: data.temperature, feelslike:data.feelslike});
        };
    });
};
module.exports = forecast;