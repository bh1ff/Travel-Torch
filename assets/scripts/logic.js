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

// ADVICE FOR OTHERS LOOKING AT THIS DOC
// ----------------------------------
// This document is a work in progress. It will be updated as the project progresses
// ----------------------------------

// LOGIC FOR THE OPENWEATHER API
// ----------------------------------
// API Refs
const weatherBaseURL = "removed for security";
const OTMAPI = "removed for securityd";
const apiKey = "removed for security";

// Display current weather function
function displayCurrentWeather(data) {
  if (!data || !data.main) {
    console.error("Invalid weather data received.");
    return;
  }
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

  localStorage.setItem("currentWeather", JSON.stringify(data));
  console.log(
    "Stored Current Weather Data:",
    JSON.parse(localStorage.getItem("currentWeather"))
  );
}

// Display 5-day forecast function
function display5DayForecast(data) {
  if (!data || !data.list || !Array.isArray(data.list)) {
    console.error("Invalid forecast data received.");
    return;
  }
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
  localStorage.setItem("fiveDayForecast", JSON.stringify(data));
  console.log(
    "Stored 5-Day Forecast Data:",
    JSON.parse(localStorage.getItem("fiveDayForecast"))
  );
}

// Handle search function
function handleSearch() {
  const cityName = document.getElementById("search-input").value.trim();
  if (cityName) {
    getCurrentWeather(cityName);
    get5DayForecast(cityName);
    getAttractions(cityName);
  } else {
    console.warn("Please enter a city name.");
  }
}

// Current weather retrieval function
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

// Five-day forecast retrieval function
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

// Added button listener
document
  .getElementById("search-button")
  .addEventListener("click", handleSearch);

// Event listener for the "Enter" key in the search input
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  });
}

// LOGIC FOR THE Here API key && Unsplash
// ----------------------------------
const hereAPIKey = "5YvWYuR8_pAQ8BkivCS2ErXdbj46NbD2QKZflflq9Nc";
const unsplashAPIKey = "WDHxakYJ8jr7zoBMf4nvqqelgHRX0drmw_4XjrTRpuA";

function getAttractions(cityName) {
  const url = `https://geocode.search.hereapi.com/v1/geocode?q=${cityName}&apiKey=${hereAPIKey}`;

  fetch(url)
    .then((response) => response.json())
    .then(async (data) => {
      if (data.items && data.items.length > 0) {
        const lat = data.items[0].position.lat;
        const lon = data.items[0].position.lng;
        fetchTopAttractions(cityName, lat, lon);
      } else {
        console.warn("No location data found for:", cityName);
      }
    })
    .catch((error) => {
      console.error("Error fetching location data:", error);
    });
}

function fetchTopAttractions(cityName, lat, lon) {
  const endpoint = `https://browse.search.hereapi.com/v1/browse?at=${lat},${lon}&categories=100-1000-0000&limit=5&apiKey=${hereAPIKey}&lang=en-GB`;

  fetch(endpoint)
    .then((response) => response.json())
    .then(async (data) => {
      if (!data || !data.items) {
        console.error("Invalid attractions data received.");
        return;
      }

      const infoDiv = document.getElementById("info");
      const attractionsHeader = document.createElement("h1");
      attractionsHeader.textContent = `Top Attractions in ${cityName}`;
      attractionsHeader.id = "attractionsTitle";
      infoDiv.appendChild(attractionsHeader);

      for (const attraction of data.items) {
        const attractionTitle = document.createElement("h2");
        attractionTitle.textContent = attraction.title;
        attractionTitle.className = "attractionName";
        infoDiv.appendChild(attractionTitle);

        const imageUrls = await searchImages(attraction.title);
        if (imageUrls && imageUrls.length > 0) {
          const attractionImage = document.createElement("img");
          attractionImage.src = imageUrls[0];
          attractionImage.className = "attractionImage";
          infoDiv.appendChild(attractionImage);
        }
      }

      localStorage.setItem("topAttractions", JSON.stringify(data.items));
      console.log(
        "Stored Top Attractions Data:",
        JSON.parse(localStorage.getItem("topAttractions"))
      );
    })
    .catch((error) => {
      console.error("Error fetching top attractions:", error);
    });
}

// Retrieve images from Unsplash
function searchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAPIKey}&per_page=1`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        return [data.results[0].urls.small];
      } else {
        console.log("No image results found for:", query);
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching image search results for:", query, error);
      return [];
    });
}
