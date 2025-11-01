//  Load API key from environment file (.env.local)
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
 
export const fetchWeatherByCity = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
 
    if (!response.ok) {
      // Show  message if key is invalid or city not found
      const errorText = await response.text();
      throw new Error(`Failed to fetch weather: ${errorText}`);
    }
 
    //  Parse and return JSON data
    const data = await response.json();
    return data;
 
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
};
 
//   Save data to local json-server (for /weatherHistory)
export const saveWeatherToServer = async (weatherData) => {
  try {
    const response = await fetch("http://localhost:4000/weatherHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(weatherData),
    });
 
    if (!response.ok) {
      throw new Error("Failed to save weather data to server");
    }
  } catch (error) {
    console.error("Error saving weather data:", error.message);
  }
};
 
export const setDefaultLocation = async (data) => {
  try {
    const res = await fetch("http://localhost:4000/defaultLocation/1");
 
    if (res.ok) {
      // Update existing record
      const updateRes = await fetch("http://localhost:4000/defaultLocation/1", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: 1 }),
      });
 
      if (!updateRes.ok) throw new Error("PUT request failed");
      return await updateRes.json();
    } else {
      // Create if not exists
      const createRes = await fetch("http://localhost:4000/defaultLocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: 1 }),
      });
 
      if (!createRes.ok) throw new Error("POST request failed");
      return await createRes.json();
    }
  } catch (err) {
    console.error(" Error in setDefaultLocation:", err);
    throw err;
  }
};