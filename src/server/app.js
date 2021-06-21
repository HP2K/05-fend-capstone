// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require ('express');

// Start up an instance of app
const app = express ();

// Dependencies 
const bodyParser = require ('body-parser');

// Middleware - Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origion allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));



/// GET route 
app.get('/getWeather', (req, res) => {

  res.send(projectData);
  console.log(projectData)
});

// POST route
app.post("/addWeather", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});
