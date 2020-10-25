import React from "react";
import styled from "styled-components";
import MenuIconOpen from "../assets/icons/menu.svg";
import MenuIconClose from "../assets/icons/x.svg";
import GlobalContext from "../context/GlobalContext";
import useDebounce from "../utils/hooks/useDebounce";
import InputSlider from "../styles/InputSlider";
import useOutsideClick from "../utils/hooks/useOutsideClick";
import config from "../utils/config";

const MenuHeader = styled.h3`
  font-size: ${(p) => p.theme.fontSize.base};
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
`;

const MenuContainer = styled.div<{ menuOpen: boolean }>`
  position: fixed;
  display: flex;
  border-radius: 1rem;
  justify-items: center;

  top: 0.25rem;
  right: 0.25rem;
  width: 3rem;
  height: 3rem;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
  max-height: 320px;
  max-width: 15rem;
  width: ${(p) => (p.menuOpen ? "100vw" : "2rem")};
  height: ${(p) => (p.menuOpen ? "100vh" : "2rem")};
  background: ${(p) => (p.menuOpen ? "#fff" : "transparent")};
  box-shadow: ${(p) =>
    p.menuOpen ? "0 0.25rem 1rem rgba(1, 1, 1, 0.5)" : "none"};
`;

const MenuImg = styled.img`
  position: absolute;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  text-align: right;
`;

const MenuSelection = styled.div<{ menuOpen: boolean }>`
  flex: 1 1 auto;
  transition: opacity 4s ease-in;
  display: ${(p) => (p.menuOpen ? "block" : "none")};
  opacity: ${(p) => (p.menuOpen ? 1 : 0)};
  margin-right: 5rem;
`;

const Label = styled.label`
  font-size: ${(p) => p.theme.fontSize.small};
  font-weight: ${(p) => p.theme.fontWeight.medium};
  margin-bottom: 0.25rem;
  display: block;
`;

const Menu = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { radiusInMeters, setRadiusInMeters } = React.useContext(GlobalContext);
  const [radiusInputValue, setRadiusInputValue] = React.useState(
    radiusInMeters
  );
  const [menuOpen, setMenuOpen] = React.useState(false);
  const radiusInMetersDebounce: any = useDebounce(radiusInputValue, 300);

  const handleOnChange = (e: any) => {
    setRadiusInputValue(e.target.value);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useOutsideClick(ref, () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  });
  // Debounce radiusInmeters change so that context change doesn't every single onChange
  React.useEffect(() => {
    setRadiusInMeters(radiusInMetersDebounce);
    localStorage?.setItem("HSLTestRadius", radiusInMetersDebounce);
  }, [radiusInMetersDebounce, setRadiusInMeters]);

  return (
    <MenuContainer menuOpen={menuOpen} ref={ref}>
      <MenuImg
        src={menuOpen ? MenuIconClose : MenuIconOpen}
        onClick={toggleMenu}
      />
      <MenuSelection menuOpen={menuOpen}>
        <MenuHeader>Settings</MenuHeader>
        <Label htmlFor="radius">Max walking ({radiusInputValue} m)</Label>
        <InputSlider
          name="radius"
          type="range"
          min="20"
          step="20"
          max={config.maxRadius}
          value={radiusInputValue}
          onChange={handleOnChange}
        />
      </MenuSelection>
    </MenuContainer>
  );
};

export default Menu;
