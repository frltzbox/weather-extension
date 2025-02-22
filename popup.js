document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("location").focus(); // Autofocus input when popup opens
});

document.getElementById("getWeather").addEventListener("click", async function () {
    const location = document.getElementById("location").value.trim();
    const weatherResult = document.getElementById("weatherResult");
    const forecastResult = document.getElementById("forecastResult");

    // Clear previous results before fetching new data
    weatherResult.innerHTML = "";
    forecastResult.innerHTML = "";

    if (!location) {
        weatherResult.innerHTML = "❌ Please enter a location.";
        return;
    }

    const apiKey = CONFIG.API_KEY; // Get API key from config.js
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        weatherResult.innerHTML = `🌡️ ${data.main.temp}°C, ${data.weather[0].description}`;
    } catch (error) {
        weatherResult.innerHTML = "❌ Location not found. Try again.";
    }
});

document.getElementById("getForecast").addEventListener("click", async function () {
    const location = document.getElementById("location").value.trim();
    const weatherResult = document.getElementById("weatherResult");
    const forecastResult = document.getElementById("forecastResult");

    // Clear previous results before fetching new data
    weatherResult.innerHTML = "";
    forecastResult.innerHTML = "";

    if (!location) {
        forecastResult.innerHTML = "❌ Please enter a location.";
        return;
    }

    const apiKey = CONFIG.API_KEY; // Get API key from config.js
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        let forecastHtml = "<h3>3-Day Forecast</h3>";

        // Extract three days of forecasts (every 8th item is roughly a new day in a 3-hour forecast)
        for (let i = 0; i < data.list.length; i += 8) {
            let day = data.list[i];
            forecastHtml += `
                <p>📅 ${new Date(day.dt_txt).toDateString()} - 
                🌡️ ${day.main.temp}°C, ${day.weather[0].description}</p>`;
        }

        forecastResult.innerHTML = forecastHtml;
    } catch (error) {
        forecastResult.innerHTML = "❌ Location not found. Try again.";
    }
});
