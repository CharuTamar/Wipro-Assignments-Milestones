// This will manage theme switching and persist the theme in localStorage.

import { createContext, useState, useEffect } from "react";
import { lightTheme, darkTheme, blueTheme } from "../theme";

// Create Context
export const ThemeContext = createContext();

// Define available themes
const themes = {
  light: lightTheme,
  dark: darkTheme,
  blue: blueTheme,
};

// Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Update theme in localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle Theme (Light → Dark → Blue → Light)
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "blue";
      return "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
