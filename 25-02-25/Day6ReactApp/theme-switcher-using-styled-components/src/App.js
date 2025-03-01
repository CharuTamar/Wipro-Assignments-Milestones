import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import ThemedComponent from "./components/ThemedComponent";
import { ThemeContext } from "./context/ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyles";
import { useContext } from "react";

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper />
    </ThemeProvider>
  );
}

// Separate wrapper to access ThemeContext inside StyledThemeProvider
const ThemeWrapper = () => {
  const { themeStyles } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={themeStyles}>
      <GlobalStyles />
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>React Theme Switcher</h1>
        <ThemeToggle />
        <ThemedComponent />
      </div>
    </StyledThemeProvider>
  );
};

export default App;
