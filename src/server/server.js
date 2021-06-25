const dotenv = require('dotenv');
dotenv.config();

//API Keys 
const GeoAPI = process.env.GEONAMES_API_KEY;
console.log("GeoAPI key =", GeoAPI)

const WeatherAPI = process.env.WEATHERBIT_API_KEY;
console.log("GeoAPI key =", WeatherAPI)

const PixabayAPI = process.env.PIXABAY_API_KEY;
console.log("GeoAPI key =", PixabayAPI)

const path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser');
const cors = require('cors')
// Require Express to run server and routes
const express = require ('express');
// Start up an instance of app
const app = express ();

// Middleware - Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origion allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8080;
app.listen(port, function () {
    console.log('running on port 8080!')
})

//Fetch coordinates from the geonames API
const geoUrl = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${GeoAPI}`;
  try{
      return await axios.get(url)
              .then(res=>{
                  return {
                      lat:res.data.geonames[0].lat,
                      lng:res.data.geonames[0].lng
                  }
              });
  } catch(e){
      console.log(e);
  }
