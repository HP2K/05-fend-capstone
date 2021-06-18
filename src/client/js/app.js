// Global Variables 
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// API key
const apiKey = '&appid=5fc069c6cbb6add77842ae6227652287&units=imperial';
 
// Create a new date instance dynamically with JS
let day = new Date();
let newDate = (day.getMonth() + 1) + '/'+ day.getDate()+'/'+ day.getFullYear();

// Event listener on generate button
document.getElementById('generate').addEventListener('click', performAction);

// Function event listner 
async function performAction(e){  
  let zip = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;
  getWeather (baseURL, zip, apiKey)
  .then (function (data) {
    let temperature = data.main.temp;
    let feel = feelings;
  
  // add data + update UI
  postData('/addWeather', { date:newDate, temp:temperature, feel:feel} );
  updateUI()
});  
}

// GET API data
const getWeather = async (baseURL, zip, apiKey) => {
    
    const response = await fetch (baseURL+zip+apiKey)
    try{
       const data = await response.json();
       return data;
    }catch(error){
       console.log("error", error);
    }
  }

  // POST API data
 const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
    try {
    const newData = await response.json();
    return newData
    }catch(error) {
    console.log("error", error);
  }
}

// Update UI
const updateUI = async () => {
  const request = await fetch('/getWeather');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.feel;

  }catch(error){
    console.log("error", error);
  }
};
