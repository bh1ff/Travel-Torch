// API REF 
const apiKey = "0b26a0d735f1c68e879212c2650e5b40"; // Your OpenWeatherMap API key
const weatherBaseURL = "https://api.openweathermap.org/data/2.5/";

// weather city function 
function getCurrentWeather(cityName) {
    let queryURL = `${weatherBaseURL}weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            // Handle the data here or pass it to another function
            console.log(data);
        })
        .catch(error => {
            console.error("Error fetching current weather:", error);
        });
}

// 5 day forecast retrieval
function get5DayForecast(cityName) {
    let queryURL = `${weatherBaseURL}forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            // Handle the data here or pass it to another function
            console.log(data);
            // You can also integrate the data into your UI here
        })
        .catch(error => {
            console.error("Error fetching 5-day forecast:", error);
        });
}

// Handle search function 
function handleSearch() {
    const cityName = document.getElementById("search-input").value.trim();
    if (cityName) {
        getCurrentWeather(cityName);
        get5DayForecast(cityName);
    } else {
        // Handle empty input or show an error message to the user
        console.warn("Please enter a city name.");
    }
}

// button integration
document.getElementById("search-button").addEventListener("click", handleSearch);
