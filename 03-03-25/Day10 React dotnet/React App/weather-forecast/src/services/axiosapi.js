import axios from "axios";

const API_BASE_URL = "http://localhost:5217"; // Ensure this matches your .NET API URL

export const fetchWeatherData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/weatherforecast`);
        return response.data; // Axios automatically parses JSON
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};