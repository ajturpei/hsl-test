import React from "react";
import styled from "styled-components";
import Menu from "./Menu";

const HeaderEl = styled.header`
  position: absolute;
  z-index: 100000;
`;

const Header = () => {
  return (
    <HeaderEl className="HSL-test-header">
      <Menu />
    </HeaderEl>
  );
};

export default Header;
