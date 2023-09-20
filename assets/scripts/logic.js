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

