const API_URL = "http://localhost:5217/weatherforecast"; // Use HTTP, NOT HTTPS

export async function fetchWeatherData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return [];
  }
}