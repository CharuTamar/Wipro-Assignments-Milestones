// import { useContext } from "react";
// import { ThemeContext } from "../context/Themecontext";

// const ThemedComponent = () => {
//   const { theme } = useContext(ThemeContext);

//   return (
//     <div
//       style={{
//         padding: "20px",
//         textAlign: "center",
//         background: theme === "light" ? "#fff" : "#222",
//         color: theme === "light" ? "#000" : "#fff",
//         borderRadius: "10px",
//         marginTop: "20px"
//       }}
//     >
//       <h2>Current Theme: {theme.toUpperCase()}</h2>
//       <p>The background color changes based on the selected theme.</p>
//     </div>
//   );
// };

// export default ThemedComponent;



import { useContext } from "react";
import { ThemeContext } from "../context/Themecontext";

const ThemedComponent = () => {
  const { themeStyles, theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        background: themeStyles.background,
        color: themeStyles.color,
        borderRadius: "10px",
        marginTop: "20px"
      }}
    >
      <h2>Current Theme: {theme.toUpperCase()}</h2>
      <p>The background color changes based on the selected theme.</p>
    </div>
  );
};

export default ThemedComponent;
