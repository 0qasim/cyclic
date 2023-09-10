import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Menu = ({ route }) => {
  return (
    <SMenu>
      <MenuButton>{route.name}</MenuButton>
      <SubRoutesContainer>
        {route.subRoutes.map((subRoute) => (
          <SubRoute to={subRoute.Link} key={subRoute.name}>
            {subRoute.name}
          </SubRoute>
        ))}
        ;
      </SubRoutesContainer>
    </SMenu>
  );
};

export default Menu;
const SubRoutesContainer = styled.div`
  position: absolute;
  max-height:12rem;
  min-width: 25rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  left: -1rem;
  border-radius:1rem;
   visibility: hidden;
   opacity: 0;
  transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;


const SMenu = styled.div`
  position: relative;
  display: inline-block;
  
  
  &:hover ${SubRoutesContainer} {
    visibility: visible;
    opacity: 1;
    cursor: pointer;
  }
`;
const MenuButton = styled.div`
  padding: .8rem;
  border-radius:5px ;
  &:hover {
    color: grey;
    transition: 0.4s ease;

    background-color: white;
    box-shadow: 0px 0px 10px white;
  }
`;

const SubRoute = styled(Link)`
text-decoration: none;
color: black;
padding:0.55rem;
border-radius:0.5rem;
transition: 0.3s ease-in;

&:hover {
    transition: 0.3s ease-in;
    color: #6f07f6;
    background-color: #d0a7fc;

}

`;
