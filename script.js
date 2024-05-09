const apiKey = 'cc6698b4183fc0ae9af8ecca7e26b355';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location, unit = 'metric') {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=${unit}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = "City not found";
            temperatureElement.textContent = "";
            descriptionElement.textContent = "";
        });
}

// Geolocation
navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = "Location not found";
            temperatureElement.textContent = "";
            descriptionElement.textContent = "";
        });
});

// Unit selection
const unitToggle = document.getElementById('unitToggle');
unitToggle.addEventListener('change', () => {
    const unit = unitToggle.checked ? 'imperial' : 'metric';
    fetchWeather(locationInput.value, unit);
});
