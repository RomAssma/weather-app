document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    console.log(`Fetching WOEID for city: ${city}`);

    // Step 1: Get the location ID (WOEID) for the city
    fetch(`https://www.metaweather.com/api/location/search/?query=${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Location data:', data);
            if (data.length === 0) {
                throw new Error('City not found');
            }
            const woeid = data[0].woeid;
            console.log(`WOEID for city ${city} is ${woeid}`);

            // Step 2: Get the weather data for the location ID
            return fetch(`https://www.metaweather.com/api/location/${woeid}/`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Weather data:', data);
            const weather = data.consolidated_weather[0];
            document.getElementById('location').textContent =` ${data.title}, ${data.parent.title}`;
            document.getElementById('temperature').textContent = `Temperature: ${weather.the_temp.toFixed(1)}°C`;
            document.getElementById('description').textContent =` Weather: ${weather.weather_state_name}`;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Could not fetch weather data. Please check the city name and try again.');
        });
});