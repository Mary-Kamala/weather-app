import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
 
const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  gap: 10px;
  flex-wrap: wrap;
`;
 
const Tab = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 8px 15px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;
 
export default function Tabs() {
  const { history } = useSelector((state) => state.weather);
 
  if (!history.length) return null;
  
 // tabs -- switch b/w saved cities(default,recent)
  return (
    <TabsContainer>
      {history.map((item) => (
        <Tab key={item.id}>{item.name}</Tab>
      ))}
    </TabsContainer>
  );
}