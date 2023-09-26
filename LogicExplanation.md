# Summary of the Code

## Advice for Readers

This document is a work in progress and will be updated as the project progresses.

## Styling Notes for Design Team

* The code contains specific ID and class selectors for styling various elements related to the OpenWeather API.
* These selectors target elements such as the current weather information, 5-day forecast, and individual elements within these sections.

## App Logic

### OpenWeather API Logic

* <b> API References:</b> The code defines constants for the OpenWeatherMap API key and base URL.

* <b> Display Functions:</b> There are two main functions to display the current weather (displayCurrentWeather) and the 5-day forecast (display5DayForecast).

* <b> Search Function: </b> The handleSearch function retrieves the city name from an input field and triggers the weather retrieval functions.

* <b> Weather Retrieval Functions: </b> The code contains two functions (getCurrentWeather and get5DayForecast) to fetch and display weather data based on the city name.

* <b> Button Listener: </b> An event listener is added to a button to trigger the search function.

### OpenTripMap & GoogleImage Logic

* <b> API Reference: </b> The code defines a constant for the OpenTripMap API key.

* <b> OpenTripMap Test Function: </b> The OpenTripMapTest function fetches latitude and longitude for a given city name and then triggers the getTopAttractions function.

* <b> Google Custom Search API References: </b> Constants are defined for the Google Custom Search API key and the Custom Search Engine ID.

* <b> Top Attractions Function: </b> The getTopAttractions function fetches the top attractions for a given city and displays them along with an image fetched using the searchImages function.

* <b> Image Search Function: </b> The searchImages function fetches image URLs for a given query using the Google Custom Search API.
