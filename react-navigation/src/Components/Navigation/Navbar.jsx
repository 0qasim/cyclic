import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { userContext } from "../../App";
import axios from "axios";
const Navbar = ({ toggleDrawer, routes }) => {
  const user = useContext(userContext);
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const navigate = useNavigate();
  const handleLogOut = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        if (res.data === "**Success") navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <SNanvbar>
      <NAvContainer>
        <DrawerButton onClick={toggleDrawer}>
          <FaBars />
        </DrawerButton>
        <SNavbarBrand>
          <img src="vite.svg" />
          !l
        </SNavbarBrand>

        <RightNav>
          {user.name ? (
            <NavRoutes>
              {routes.map((route) => {
                if (route.subRoutes) {
                  return <Menu route={route} key={route.name} />;
                }
                return (
                  <NavRoute to={route.link} key={route.name}>
                    {route.name}
                  </NavRoute>
                );
              })}
            </NavRoutes>
          ) : (
            <></>
          )}
          {user.name ? (
            <div>
              <DropdownContainer>
                <AvatarButton onClick={toggleProfileOptions}>
                  {user.email.substring(0, 2)}
                </AvatarButton>
                {showProfileOptions && (
                  <DropdownContent>
                    <LogoutButton onClick={handleLogOut}>Log Out</LogoutButton>
                    <ProfileButton>Profile</ProfileButton>
                  </DropdownContent>
                )}
              </DropdownContainer>
            </div>
          ) : (
            <>
              <RegisterButton to="/Signup">Register</RegisterButton>
              <LoginButton to="/Signin">Login</LoginButton>
            </>
          )}
        </RightNav>
      </NAvContainer>
    </SNanvbar>
  );
};
const DrawerButton = styled.button`
  all: unset;
  font-size: 3rem;
  display: grid;
  @media (min-width: 768px) {
    display: none;
  }
`;

const AvatarButton = styled.button`
  border: 2px solid; /* Added border */

  color: #4b37cf;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: 650;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, color 0.2s ease; /* Added animation */

  &:hover {
    background: linear-gradient(#4b37cf, #d13abd, #4b37cf);
    color: beige;
  }
`;
const SNanvbar = styled.nav`
  background-color: #4b37cf;
`;
const NAvContainer = styled.div`
  padding: 1rem;
  height: 70px;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;
const SNavbarBrand = styled.h2`
  font-size: 3rem;
`;
const RightNav = styled.div`
  display: flex;
  gap: 2rem;
`;
const NavRoutes = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 2rem;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;
const NavRoute = styled(Link)`
  padding: 0.5rem;
  text-decoration: none;
  color: inherit;
  &:hover {
    color: grey;
    transition: 0.4s ease;
    box-shadow: 0px 0px 10px yellow;
    border-radius: 5px;
    background-color: white;
  }
`;

const LoginButton = styled(Link)`
  padding: 1rem 3rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 3rem;
  transition: 0.4s ease;
  text-decoration: none;

  &:hover {
    transition: 0.4s ease;
    border: 1px solid transparent;
    background-color: #0018a2;
    box-shadow: 0px 0px 10px yellow;
    color: white;
  }
`;
const RegisterButton = styled(Link)`
  padding: 1rem 3rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 3rem;
  transition: 0.4s ease;
  text-decoration: none;

  &:hover {
    transition: 0.4s ease;
    border: 1px solid transparent;
    background-color: #0018a2;
    box-shadow: 0px 0px 10px yellow;
    color: white;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  position: absolute;
  max-height: 12rem;
  min-width: 14rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  left: -1rem;
  border-radius: 1rem;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;

  ${DropdownContainer}:hover & {
    visibility: visible;
    opacity: 1;
    cursor: pointer;
  }
`;

const ProfileButton = styled.button`
  background-color: #f9f9f9;
  color: #333;
  padding: 10px;
  text-align: center;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    transition: 0.3s ease-in;
    color: #6f07f6;
    background-color: #d0a7fc;
  }
`;
const LogoutButton = styled.button`
  color: #333;
  padding: 10px;
  text-align: center;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: 0.4s ease;
  background-color: transparent;
  border-radius: 5px;

  &:hover {
    transition: 0.3s ease-in;
    color: #6f07f6;
    background-color: #d0a7fc;
  }
`;

export default Navbar;
