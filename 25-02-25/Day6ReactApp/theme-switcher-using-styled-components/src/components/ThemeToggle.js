import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components";

// Styled button using styled-components
const ToggleButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background: ${(props) =>
    props.theme.background === "#fff" ? "#333" :
    props.theme.background === "#222" ? "#ADD8E6" : "#fff"};
  color: ${(props) =>
    props.theme.background === "#fff" ? "#fff" :
    props.theme.background === "#222" ? "#000" : "#000"};
  border: none;
  border-radius: 5px;
  margin-top: 20px;
`;

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return <ToggleButton onClick={toggleTheme}>Change Theme</ToggleButton>;
};

export default ThemeToggle;
