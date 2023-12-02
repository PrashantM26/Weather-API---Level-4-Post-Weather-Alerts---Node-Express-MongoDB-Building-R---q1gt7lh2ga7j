const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/*
  Instructions for students:
  Implement the function to save weather alerts.

  Function:
    saveWeatherAlert(alertDetails)

  Input:
    - alertDetails (object): The details of the weather alert to be saved.


  Tips:
    - Use the provided functions getDataFromDatabase() and saveDataToDatabase() to read and write data from the 'data.json' file.
    - Read the existing data from the 'data.json' file using getDataFromDatabase().
    - Write the data to the 'data.json' file using saveDataToDatabase().    
*/



// Level 4: Post Weather Alerts
async function saveWeatherAlert(alertDetails) {
   // TODO: Implement this function
   try {
    const cityDetails = await getDataFromDatabase();
    const { city, date, humidity } = alertDetails;

    // Check if the city already exists in the data
    const existingCity = cityDetails.find((element) => element.city === city);

    if (existingCity) {
      // City already exists, update the forecast for the specific date
      if (!existingCity.forecast) {
        existingCity.forecast = {};
      }

      existingCity.forecast[date] = { humidity };
    } else {
      // City does not exist, create a new entry
      const newCity = {
        city,
        forecast: {
          [date]: { humidity },
        },
      };

      cityDetails.push(newCity);
    }

    // Save the updated data to the database
    await saveDataToDatabase(cityDetails);

    return { status: 'success', message: 'Weather alert saved successfully' };
  } catch (error) {
    throw new Error('Failed to save weather alert');
  }
  
}

module.exports = {
  saveWeatherAlert
};
