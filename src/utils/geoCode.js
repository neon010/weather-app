const request = require("postman-request");

const geoCode = (address, callback) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWtzbW9oYW4iLCJhIjoiY2tscWVoZzc5MWF0ejJ2bXNlMmxvaXZ3eCJ9.5USL5_T0MCV8SKApTWSkiw&limit=1`;
    request({ url: geocodeUrl, json:true}, (error, response) =>{
        if (error) {
            callback("Unable to connect to  the network",undefined);
        }else if(response.body.message) {
            callback(response.body.message, undefined);
        }else if(response.body.features.length === 0){
            callback("unable to find the location", undefined);
        }else{
            const lat = response.body.features[0].center[1];
            const long = response.body.features[0].center[0];
            const location = response.body.features[0].place_name
            callback(undefined,{ lat, long , location});
        }
    })
};

module.exports = geoCode;