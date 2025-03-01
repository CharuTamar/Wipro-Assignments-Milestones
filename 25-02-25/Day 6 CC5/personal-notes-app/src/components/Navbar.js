import { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { toggleTheme, themeMode } = useContext(ThemeContext);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          📒 Personal Notes
        </Typography>
        <Button onClick={toggleTheme} color="inherit">
          {themeMode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
