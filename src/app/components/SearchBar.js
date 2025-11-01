// src/components/SearchBar.js
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getWeather } from "@/app/features/weatherSlice";
 
// Styled Components for the input box and button
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  gap: 10px;
`;
 
const Input = styled.input`
  padding: 10px 15px;
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 16px;
  width: 250px;
`;
 
const Button = styled.button`
  background: #ffa500;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #ff8800;
  }
`;
 
export default function SearchBar() {
  const [city, setCity] = useState(""); // Store input text
  const dispatch = useDispatch();
 
  // Function that runs when user clicks search
  const handleSearch = () => {
    if (city.trim() === "") return; // Prevent empty input
    dispatch(getWeather(city));     // Trigger redux thunk to fetch weather
    setCity("");                    // Clear input after search
  };
 
  //user type a city name & fetch weather
  return (
    <SearchContainer>
      <Input
        type="text"
        value={city}
        placeholder="Search city..."
        onChange={(e) => setCity(e.target.value)} // Update city as user types
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchContainer>
  );
}
 