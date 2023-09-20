// API Refs 
const apiKey = "0b26a0d735f1c68e879212c2650e5b40"; // Your OpenWeatherMap API key
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/";

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
    temperature.textContent = `Temperature: ${data.main.temp}°F`;
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
        icon.src = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
        icon.alt = dayData.weather[0].description;
        icon.classList.add("forecast-icon");

        const temp = document.createElement("p");
        temp.textContent = `Temp: ${dayData.main.temp}°F`;
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
    } else {
        console.warn("Please enter a city name.");
    }
}

// current weather retrieval function 
function getCurrentWeather(cityName) {
    let queryURL = `${weatherBaseURL}weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
        })
        .catch(error => {
            console.error("Error fetching current weather:", error);
        });
}

// five day forecast retrieval function 
function get5DayForecast(cityName) {
    let queryURL = `${weatherBaseURL}forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            display5DayForecast(data);
        })
        .catch(error => {
            console.error("Error fetching 5-day forecast:", error);
        });
}

// added button listener 
document.getElementById("search-button").addEventListener("click", handleSearch);
