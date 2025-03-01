// import { createContext, useState } from "react";

// // Create the Context
// export const ThemeContext = createContext();

// // Context Provider
// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light"); // Default theme is light

//   // Toggle Theme Function
//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     // Step 4: Provide the context value (theme & toggle function)
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };




import { createContext, useState, useEffect } from "react";

// Define themes
const themes = {
  light: { background: "#fff", color: "#000" },
  dark: { background: "#222", color: "#fff" },
  blue: { background: "#ADD8E6", color: "#000" } // Blue theme
};

// Create Context
export const ThemeContext = createContext();

// Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme

  // Load theme from localStorage (if available)
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Update `body` background when theme changes
  useEffect(() => {
    document.body.style.backgroundColor = themes[theme].background;
    document.body.style.color = themes[theme].color;
    localStorage.setItem("theme", theme); // Save theme in localStorage
  }, [theme]);

  // Toggle Theme Function (Light → Dark → Blue)
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "blue";
      return "light"; // Blue → Light
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
