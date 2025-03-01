// import { useContext } from "react";
// import { ThemeContext } from "../context/Themecontext";

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <button
//       onClick={toggleTheme}
//       style={{
//         padding: "10px 20px",
//         cursor: "pointer",
//         background: theme === "light" ? "#333" : "#fff",
//         color: theme === "light" ? "#fff" : "#000",
//         border: "none",
//         borderRadius: "5px",
//         marginTop: "20px"
//       }}
//     >
//       Switch to {theme === "light" ? "Dark" : "Light"} Mode
//     </button>
//   );
// };

// export default ThemeToggle;



import { useContext } from "react";
import { ThemeContext } from "../context/Themecontext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "10px 20px",
        cursor: "pointer",
        background: theme === "light" ? "#333" : theme === "dark" ? "#fff" : "#0000FF",
        color: theme === "light" ? "#fff" : theme === "dark" ? "#000" : "#fff",
        border: "none",
        borderRadius: "5px",
        marginTop: "20px"
      }}
    >
      Switch to {theme === "light" ? "Dark" : theme === "dark" ? "Blue" : "Light"} Mode
    </button>
  );
};

export default ThemeToggle;

