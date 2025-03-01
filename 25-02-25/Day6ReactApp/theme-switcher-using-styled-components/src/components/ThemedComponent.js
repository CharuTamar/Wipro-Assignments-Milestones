import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components";

// Styled component for theme changes
const ThemedDiv = styled.div`
  padding: 20px;
  text-align: center;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  border-radius: 10px;
  margin-top: 20px;
`;

const ThemedComponent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemedDiv>
      <h2>Current Theme: {theme.toUpperCase()}</h2>
      <p>The background color changes based on the selected theme.</p>
    </ThemedDiv>
  );
};

export default ThemedComponent;
