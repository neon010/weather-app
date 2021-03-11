const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 5000;


//define path for express  config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebars and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath )


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render("index",{
        title:"weather App",
        name:"Mohan Kumar"
    });
});


app.get('/help', (req, res) => {
    res.render("help", {
        title:"weather App",
        name:"Mohan Kumar",
        messages: "This is the weather app help page. Currently cannot  help you."
    });
});

app.get('/about', (req, res) => {
    res.render("about", {
        title:"weather App ",
        name:"Mohan Kumar"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Location is required"
        })
    }
    geoCode(req.query.address, (error, {lat, lng, location}={}) => {   //added es6 default parameters
        if(error){
            return res.send({error});
        }
        forecast(lat, lng, (error, forecastdata) => {
            if(error) {
                return res.send({error});
            }
            return res.send({location, forecastdata});
        });
    })
});


app.get('/help/*', (req, res) => {
    res.render("404page", {
        title:"weather App ",
        name:"Mohan Kumar",
        error:"Help article not found"
    });
});


app.get('*', (req, res) => {
    res.render("404page", {
        title:"weather App",
        name:"Mohan Kumar",
        error:"Page not found"
    });
});

app.listen(port, ()=>{
    console.log(`listening on ${port}`);
})