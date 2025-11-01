"use client";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { setDefaultLocation } from "../utils/api";
 
const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  width: 300px;
  margin: 20px auto;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;
 
const Temp = styled.h1`
  font-size: 48px;
  margin-bottom: 5px;
`;
 
const Desc = styled.p`
  font-size: 18px;
  color: #ddd;
`;
 
const Icon = styled.img`
  width: 80px;
  height: 80px;
`;
 
export default function WeatherCard() {
  const { current, loading, error } = useSelector((state) => state.weather);
 
  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error)
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        {error.message || "Something went wrong"}
      </p>
    );
  if (!current)
    return <p style={{ textAlign: "center" }}>Search for a city to see weather</p>;
 
  const { name, main, weather } = current;
  const iconCode = weather[0].icon;
 
  //  Fix: use "current" data here, not props
  const handleSetDefault = async () => {
    try {
      const payload = {
        city: name,
        temp: main.temp,
        description: weather[0].description,
        icon: weather[0].icon,
        time: new Date().toLocaleString(),
      };
 
      await setDefaultLocation(payload);
      alert(`${name} is now set as your default location `);
    } catch (error) {
      console.error("Set default failed:", error);
      alert(" Failed to set default location");
    }
  };

  // display cityname,temp,weather icon
 
  return (
    <Card>
      <h2>{name}</h2>
      <Icon
        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
        alt={weather[0].description}
      />
      <Temp>{Math.round(main.temp)}°C</Temp>
      <Desc>{weather[0].description}</Desc>
      <p>Feels like: {Math.round(main.feels_like)}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Pressure: {main.pressure} mb</p>
 
      <button
        onClick={handleSetDefault}
        style={{
          marginTop: "10px",
          backgroundColor: "#ff9800",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Set as Default
      </button>
    </Card>
  );
}