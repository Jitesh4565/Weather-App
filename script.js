var cities = []; // Array to store added cities

    async function getWeatherData() {
      // Get the input element by its ID
      var cityInput = document.getElementById("cityInput");

      // Get the value entered by the user (city name)
      var cityName = cityInput.value;

      // Check if the user entered a city name
      if (!cityName) {
        alert("Please enter a city name.");
        return;
      }

      // Check if the city is already present
      if (cities.includes(cityName)) {
        alert("City is already added.");
        return;
      }

      // Your OpenWeatherMap API key
      var apiKey = 'e7e72fbd8215cbf2f87f5f369c8dfa2e'; 

      // OpenWeatherMap API URL with the city name, API key, and units=metric
      var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

      try {
        // Make the API call
        var response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        var data = await response.json();

        // Add the city to the array
        cities.push(cityName);

        // Process the weather data and create a weather card
        createWeatherCard(cityName, data);

        // Sort the weather cards based on temperatures
        sortWeatherCards();
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
        alert('An error occurred while fetching weather data.');
      }
    }

    function createWeatherCard(cityName, data) {
      // Get the container for weather cards
      var weatherCardsContainer = document.getElementById("weatherCardsContainer");

      // Create a new weather card element
      var card = document.createElement("div");
      card.classList.add("weather-card");

      // Construct the HTML content for the weather card
      card.innerHTML = `
        <h3>${cityName}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>High: ${data.main.temp_max} °C</p>
        <p>Low: ${data.main.temp_min} °C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
      `;

      // Append the weather card to the container
      weatherCardsContainer.appendChild(card);
    }

    function sortWeatherCards() {
      // Get the container for weather cards
      var weatherCardsContainer = document.getElementById("weatherCardsContainer");

      // Get all weather cards
      var weatherCards = Array.from(weatherCardsContainer.getElementsByClassName("weather-card"));

      // Sort weather cards based on temperatures (ascending order)
      weatherCards.sort(function (a, b) {
        var tempA = parseFloat(a.querySelector('p:nth-child(2)').textContent.split(' ')[1]);
        var tempB = parseFloat(b.querySelector('p:nth-child(2)').textContent.split(' ')[1]);
        return tempA - tempB;
      });

      // Clear the current content of the container
      weatherCardsContainer.innerHTML = "";

      // Append the sorted weather cards to the container
      weatherCards.forEach(function (card) {
        weatherCardsContainer.appendChild(card);
      });
    }