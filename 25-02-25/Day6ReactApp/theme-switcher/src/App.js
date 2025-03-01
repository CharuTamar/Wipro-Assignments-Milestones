import { ThemeProvider } from "./context/Themecontext";
import ThemeToggle from "./components/ThemeToggle";
import ThemedComponent from "./components/ThemedComponent";

function App() {
  return (
    <ThemeProvider>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>React Theme Switcher</h1>
        <ThemeToggle />
        <ThemedComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
