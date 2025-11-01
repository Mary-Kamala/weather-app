import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weatherSlice";
 
// configureStore helps us combine slices easily
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});