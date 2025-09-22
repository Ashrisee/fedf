export async function fetchWeather(city) {
    const weatherResult = document.getElementById("weatherResult");
    try {
        if (!city) {
            weatherResult.innerHTML = "<p>Please enter a city name.</p>";
            return;
        }

        // Show loading text
        weatherResult.innerHTML = "<p>Loading weather...</p>";

        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        if (!response.ok) throw new Error("City not found or API error.");

        const data = await response.json();
        displayWeather(city, data);
        localStorage.setItem("lastCity", city);
    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

export function displayWeather(city, data) {
    const current = data.current_condition[0];
    const weatherResult = document.getElementById("weatherResult");

    weatherResult.innerHTML = `
        <h2>${city}</h2>
        <p><strong>Temperature:</strong> ${current.temp_C} °C</p>
        <p><strong>Condition:</strong> ${current.weatherDesc[0].value}</p>
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
    `;
}
