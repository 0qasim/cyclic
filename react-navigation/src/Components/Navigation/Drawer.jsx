import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ExpandMenu from "./ExpandMenu";
const Drawer = ({ routes, isOpen, toggleDrawer }) => {
  return (
    <div>
      {isOpen && <BackDrop onClick={toggleDrawer} />}
      <SDrawer isOpen={isOpen}>
        <RightNav>
          <SNavbarBrand>-LOGO</SNavbarBrand>
          <NavRoutes>
            {routes.map((route) => {
              if (route.subRoutes) {
                return <ExpandMenu route={route} key={route.name} />;
              }
              return (
                <NavRoute
                  onClick={toggleDrawer}
                  to={route.link}
                  key={route.name}
                >
                  {route.name}
                </NavRoute>
              );
            })}
          </NavRoutes>
        </RightNav>
        <LoginButton>Login</LoginButton>
      </SDrawer>
    </div>
  );
};

export default Drawer;

const BackDrop = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.5s ease;

  background-color: rgba(0, 0, 0, 0.2);
`;
const SDrawer = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 60%;
  background-color: white;
  transition: 0.3s ease;

  transform: translateX(${(props) => (props.isOpen ? "0" : "-100%")});
`;
const RightNav = styled.div`
display:flex;
flex-direction: column;
gap 2rem;
padding:1rem;
`;
const SNavbarBrand = styled.h2`
  font-size: 3rem;
`;
const NavRoutes = styled.div`

  }
  `;
const NavRoute = styled(Link)` 
display: flex;
padding:0.5rem;
text-decoration: none;
color: inherit;
font-size:2.5rem;
&:hover {
  color:grey;
  transition: 0.4s ease;
   
  background-color: white;
  box-shadow: 0px 0px 10px white;
`;
const LoginButton = styled.button`  padding: 0.7rem 3rem;

background-color: white;
border: 1px solid black;
border-radius: 3rem;
transition: 0.4s ease;
align-self:flex-start;
&:hover {
  transition: 0.4s ease;
  border: 1px solid transparent;
  background-color: yellow;
  box-shadow: 0px 0px 10px yellow;`;
