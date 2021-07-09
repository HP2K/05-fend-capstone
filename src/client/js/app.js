
// Event listener on generate button
document.getElementById('submit').addEventListener('click', performAction);

// Function event listner 
async function performAction(e) {
  let destination = document.getElementById('destination').value;
  let startDate = document.getElementById('startDate').value;

  // TODO: dynamic url
  postData('http://localhost:8081/destination', {
    destination,
    startDate
  })
    .then(function (data) {
      updateUI(data)
    });  
}

// POST API data
const postData = async (url = '', data = {}) => {
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
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

// Update UI
const updateUI = async (result) => {
  const picture = result.picture;
  const forecastTable = result.forecast.map(forecast => {
    return `<div><span>${forecast.date}</span><img src="${forecast.icon}"><span>${forecast.min_temp} - ${forecast.max_temp}</span></div>` 
  })
  document.getElementById('show').innerHTML = `<img src="${picture}">` + forecastTable;
};
