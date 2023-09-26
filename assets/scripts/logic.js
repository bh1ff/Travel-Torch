// ADVICE FOR OTHERS LOOKING AT THIS DOC
// ----------------------------------
// This document is a work in progress. It will be updated as the project progresses
// ----------------------------------

// Styling Notes for Design Team
// ----------------------------------

// Design for the OPEN WEATHER API
// ----------------------------------
// #currentWeather:
// This ID selector targets the div that contains the current weather information.

// .current-weather:
// This class selector can be used to style the current weather div.

// .city-name, .current-temperature, .current-humidity, .current-wind-speed:
// These class selectors target the individual elements within the current weather div.

// #fiveDayForecast:
// This ID selector targets the div that contains the 5-day forecast.

// .forecast-div:
// This class selector can be used to style the 5-day forecast div.

// .forecast-day:
// This class selector targets each individual day within the 5-day forecast.

// .forecast-date, .forecast-icon, .forecast-temperature, .forecast-humidity:
// These class selectors target the individual elements within each forecast day.

// App Logic
// ----------------------------------
// LOGIC FOR THE OPENWEATHER API
// ----------------------------------
// API Refs
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/";

const OTMAPI = "5ae2e3f221c38a28845f05b66a252504e753f805146378d6cae9fabd";
const apiKey = "0b26a0d735f1c68e879212c2650e5b40";
const  unsplashAPIKey  = 'WDHxakYJ8jr7zoBMf4nvqqelgHRX0drmw_4XjrTRpuA';

// display weather function
function displayCurrentWeather(data) {
  const infoDiv = document.getElementById("info");

  // Clear previous data
  infoDiv.innerHTML = "";

  // Create elements for current weather
  const currentWeatherDiv = document.createElement("div");
  currentWeatherDiv.id = "currentWeather";
  currentWeatherDiv.classList.add("current-weather");

  const cityName = document.createElement("h2");
  cityName.textContent = data.name;
  cityName.classList.add("city-name");

  const temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  console.log(data.main)
  temperature.classList.add("current-temperature");

  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  humidity.classList.add("current-humidity");

  const windSpeed = document.createElement("p");
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} MPH`;
  windSpeed.classList.add("current-wind-speed");

  // Append elements to currentWeatherDiv
  currentWeatherDiv.appendChild(cityName);
  currentWeatherDiv.appendChild(temperature);
  currentWeatherDiv.appendChild(humidity);
  currentWeatherDiv.appendChild(windSpeed);

  // Append currentWeatherDiv to infoDiv
  infoDiv.appendChild(currentWeatherDiv);
}

// display 5 day forecast function
function display5DayForecast(data) {
  const infoDiv = document.getElementById("info");
  const forecastDiv = document.createElement("div");
  forecastDiv.id = "fiveDayForecast";
  forecastDiv.classList.add("forecast-div");

  for (let i = 0; i < data.list.length; i += 8) {
    const dayData = data.list[i];

    const dayDiv = document.createElement("div");
    dayDiv.classList.add("forecast-day");

    const date = document.createElement("h4");
    date.textContent = new Date(dayData.dt_txt).toLocaleDateString();
    date.classList.add("forecast-date");

    const icon = document.createElement("img");
    icon.src =
      "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
    icon.alt = dayData.weather[0].description;
    icon.classList.add("forecast-icon");

    const temp = document.createElement("p");
    temp.textContent = `Temp: ${dayData.main.temp}°C`;
    temp.classList.add("forecast-temperature");

    const humidity = document.createElement("p");
    humidity.textContent = `Humidity: ${dayData.main.humidity}%`;
    humidity.classList.add("forecast-humidity");

    dayDiv.appendChild(date);
    dayDiv.appendChild(icon);
    dayDiv.appendChild(temp);
    dayDiv.appendChild(humidity);

    forecastDiv.appendChild(dayDiv);
  }

  infoDiv.appendChild(forecastDiv);
}

// handle search function
function handleSearch() {
  const cityName = document.getElementById("search-input").value.trim();
  if (cityName) {
    getCurrentWeather(cityName);
    get5DayForecast(cityName);
    //open trip map test call
    OpenTripMapTest(cityName);
  } else {
    console.warn("Please enter a city name.");
  }
}

// current weather retrieval function
function getCurrentWeather(cityName) {
  let queryURL = `${weatherBaseURL}weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather:", error);
    });
}

// five day forecast retrieval function
function get5DayForecast(cityName) {
  let queryURL = `${weatherBaseURL}forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      display5DayForecast(data);
    })
    .catch((error) => {
      console.error("Error fetching 5-day forecast:", error);
    });
}

// added button listener
document
  .getElementById("search-button")
  .addEventListener("click", handleSearch);

// --------------------------------
// Notes for the Styling Team
// #attractionsTitle: This ID is for the title of the attractions section.
// It's an <h1> element that displays "Top Attractions in [City Name]".

// .attractionName: This class is for each attraction name.
//They are <h2> elements that display the name of the attraction.

// .wikiData: This class is for the Wikipedia data of each attraction.
//It's a <p> element that displays a brief description or data from Wikipedia for each attraction.

// .attractionImage: This class is for the image of each attraction.
// It's an <img> element, and we will replace its src attribute with the actual image URL later.
// --------------------------------
// LOGIC FOR THE OpenTripMap API && SerpAPI
// ----------------------------------

// Define API key and endpoint

// Inputs city name and returns longitude and latitude (logic) 
function OpenTripMapTest(cityName) {
  // Construct the API URL
  const url = `http://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${OTMAPI}`;

  // Fetch data from OpenTripMap
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("OpenTripMap Data:", data);
      // Get latitude and longitude
      const lat = data.lat;
      const lon = data.lon;
      // Fetch top attractions using latitude and longitude
      getTopAttractions(cityName, lat, lon);
    })
    .catch((error) => {
      console.error("Error fetching data from OpenTripMap:", error);
    });
}

// google custom search api key



// function to get the city attractions and append the document
function getTopAttractions(cityName, lat, lon) {
  const url = `http://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=${lon}&lat=${lat}&limit=5&apikey=${OTMAPI}`;

  fetch(url)
    .then((response) => response.json())
    .then(async (data) => {
      const infoDiv = document.getElementById("info");

      const attractionsTitle = document.createElement("h1");
      attractionsTitle.textContent = `Top Attractions in ${cityName}`;
      attractionsTitle.id = "attractionsTitle";
      infoDiv.appendChild(attractionsTitle);

      for (const feature of data.features) {
        const attractionName = feature.properties.name;

        const attractionElement = document.createElement("h2");
        attractionElement.textContent = attractionName;
        attractionElement.className = "attractionName";
        infoDiv.appendChild(attractionElement);

        const imageUrls = await searchImages(attractionName);
        if (imageUrls && imageUrls.length) {
          const imagePlaceholder = document.createElement("img");
          imagePlaceholder.src = imageUrls[0];
          imagePlaceholder.className = "attractionImage";
          infoDiv.appendChild(imagePlaceholder);
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching data from OpenTripMap:", error);
    });
}

// retrieve images from unsplash
function searchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAPIKey}&per_page=1`;

  return fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data.results && data.results.length > 0) {
              return [data.results[0].urls.small]; // Returns the URL of the first image result
          } else {
              console.log('No image results found for:', query);
              return [];
          }
      })
      .catch(error => {
          console.error('Error fetching image search results for:', query, error);
          return [];
      });
}
