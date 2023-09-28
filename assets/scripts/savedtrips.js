document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the "View trip" button
    const viewTripButton = document.querySelector("[data-bs-target='#tripModal']");
    if (viewTripButton) {
        viewTripButton.addEventListener("click", displaySavedTripDetails);
    }
});

function displaySavedTripDetails() {
    // Retrieve the saved trip details from localStorage
    const currentWeather = JSON.parse(localStorage.getItem("currentWeather"));
    const fiveDayForecast = JSON.parse(localStorage.getItem("fiveDayForecast"));
    const topAttractions = JSON.parse(localStorage.getItem("topAttractions"));

    if (currentWeather && fiveDayForecast && topAttractions) {
        // Populate the modal with the saved trip details
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = ""; // Clear previous content

        // Display current weather
        const currentWeatherDiv = document.createElement("div");
        currentWeatherDiv.innerHTML = `
            <h2 class="city-name">${currentWeather.name}</h2>
            <p class="current-temperature">Temperature: ${currentWeather.main.temp}°C</p>
            <p class="current-humidity">Humidity: ${currentWeather.main.humidity}%</p>
            <p class="current-wind-speed">Wind Speed: ${currentWeather.wind.speed} MPH</p>
        `;
        modalBody.appendChild(currentWeatherDiv);

        // Display 5-day forecast
        const forecastDiv = document.createElement("div");
        forecastDiv.id = "fiveDayForecast";
        forecastDiv.classList.add("forecast-div");
        fiveDayForecast.list.forEach((dayData, index) => {
            if (index % 8 === 0) {
                const dayDiv = document.createElement("div");
                dayDiv.classList.add("forecast-day");
                dayDiv.innerHTML = `
                    <h4 class="forecast-date">${new Date(dayData.dt_txt).toLocaleDateString()}</h4>
                    <img class="forecast-icon" src="https://openweathermap.org/img/w/${dayData.weather[0].icon}.png" alt="${dayData.weather[0].description}">
                    <p class="forecast-temperature">Temp: ${dayData.main.temp}°C</p>
                    <p class="forecast-humidity">Humidity: ${dayData.main.humidity}%</p>
                `;
                forecastDiv.appendChild(dayDiv);
            }
        });
        modalBody.appendChild(forecastDiv);

        // Display top attractions
        const attractionsDiv = document.createElement("div");
        attractionsDiv.innerHTML = `<h1 id="attractionsTitle">Top Attractions in ${currentWeather.name}</h1>`;
        topAttractions.forEach(attraction => {
            const attractionElement = document.createElement("div");
            attractionElement.innerHTML = `
                <h2 class="attractionName">${attraction.title}</h2>
                <img class="attractionImage" src="${attraction.image}" alt="${attraction.title}">
            `;
            attractionsDiv.appendChild(attractionElement);
        });
        modalBody.appendChild(attractionsDiv);
    } else {
        console.log("No saved trip details found.");
    }
}
