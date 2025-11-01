import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeatherByCity, saveWeatherToServer } from "../utils/api";
 
// Async action to fetch and store weather data
export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (city, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherByCity(city);
 
      // Save to local JSON server
      await saveWeatherToServer({
        id: data.id,
        city: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        time: new Date().toLocaleString(),
      });
 
      return data;
    } catch (error) {
      console.error("Error in getWeather:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);
 
const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: null,
    loading: false,
    error: null,
    history: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
 
        //  Prevent duplicate city names
        const cityName = action.payload.name;
 
        // Remove existing entry if city already in history
        state.history = state.history.filter(
          (item) => item.name !== cityName
        );
 
        // Add latest city to the top of history
        state.history.unshift(action.payload);
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch weather data";
      });
  },
});
 
export default weatherSlice.reducer;