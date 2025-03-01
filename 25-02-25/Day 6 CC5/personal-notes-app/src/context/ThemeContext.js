import { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create Theme Context
export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  // Ensure only "light" or "dark" is used
  const storedTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";
  const [themeMode, setThemeMode] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  // Toggle between dark & light mode
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Define theme styles (Ensuring primary & secondary colors exist)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: { main: "#1976d2" }, // Ensure primary color exists
          secondary: { main: "#dc004e" },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
