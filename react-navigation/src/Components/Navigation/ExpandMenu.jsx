import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight, FaAngleDown } from "react-icons/fa";
const ExpandMenu = ({ route }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <SMenu>
      <MenuButton onClick={toggleMenu}>
        {route.name}
        {isMenuOpen ? <FaAngleDown /> : <FaAngleDoubleRight />}
      </MenuButton>
      <SubRoutesContainer isOpen={isMenuOpen}>
        {route.subRoutes.map((subRoute) => (
          <SubRoute
            onClick={() => {
              this.style.bacgroundColor = "grey";
            }}
            to={subRoute.Link}
            key={subRoute.name}
          >
            {subRoute.name}
          </SubRoute>
        ))}
        ;
      </SubRoutesContainer>
    </SMenu>
  );
};

export default ExpandMenu;
const SubRoutesContainer = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  padding: 1rem;
`;

const SMenu = styled.div``;
const MenuButton = styled.div`
  font-size: 2.5rem;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  display: flex;
`;

const SubRoute = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 0.55rem;
  border-radius: 0.5rem;
  transition: 0.3s ease-in;

  &:hover {
    background-color: grey;
  }
`;
