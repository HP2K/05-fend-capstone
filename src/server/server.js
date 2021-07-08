const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios')
//API Keys 
const GeoAPI = process.env.GEONAMES_API_KEY;
console.log("GeoAPI key =", GeoAPI)

const WeatherAPI = process.env.WEATHERBIT_API_KEY;
console.log("GeoAPI key =", WeatherAPI)

const PixabayAPI = process.env.PIXABAY_API_KEY;
console.log("GeoAPI key =", PixabayAPI)

const path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser');
const cors = require('cors')
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Middleware - Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origion allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));


// Setup Server
const port = process.env.PORT || 8081;
app.listen(port, function () {
    console.log(`running on port ${port}!`)
})

app.post('/destination', getDestinationInfo)

async function getDestinationInfo(req, res) {
    const { destination, startDate } = req.body;

    const { lat, lng } = await getLatLong(destination);
    
    const forecast = await getWeatherForecast(lat, lng, startDate);

    const picture = await getPicture(destination)

    res.send({
        forecast,
        picture,
    })
}

async function getLatLong(destination) {
    const url = `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${GeoAPI}`;

    try {
        return await axios.get(url)
            .then(result => {
                return {
                    lat: result.data.geonames[0].lat,
                    lng: result.data.geonames[0].lng
                };
            });
    } catch (e) {
        console.log(e);
    }
}

async function getWeatherForecast(lat, lng, startDate) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=${WeatherAPI}`;
    try {
        return await axios.get(url)
            .then(result => {
                const forecasts = result.data.data;
                console.log(forecasts)

                return forecasts
                    .filter(forecast => forecast.datetime, forecast.max_temp, forecast.min_temp >= startDate)
                    .map(forecast, max_temp, min_temp => {
                        return { icon: `https://www.weatherbit.io/static/img/icons/${forecast.weather.icon}.png`, date: forecast.datetime, max_temp: forecast.max_temp, min_temp: forecast.min_temp }
                    })
            });
    } catch (e) {
        console.log(e);
    }
}

async function getPicture(destination) {
    const url = `https://pixabay.com/api/?key=${PixabayAPI}&q=${destination}&image_type=photo`;
    try {
        return await axios.get(url)
            .then(result => {
                const imagesCount = result.data.hits.length;
                return result.data.hits[Math.floor(Math.random() * imagesCount)].webformatURL;
            });
    } catch (e) {
        console.log(e);
    }
}
