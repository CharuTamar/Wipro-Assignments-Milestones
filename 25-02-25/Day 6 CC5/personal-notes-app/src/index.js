import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotesProvider } from "./context/NotesContext";
import { ThemeProviderWrapper } from "./context/ThemeContext"; // Import Theme Context

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProviderWrapper>
    <NotesProvider>
      <App />
    </NotesProvider>
  </ThemeProviderWrapper>
);



// Register Service Worker for PWA Support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
      navigator.serviceWorker
          .register("/serviceWorker.js") // Correct path
          .then(() => console.log("Service Worker Registered"))
          .catch((err) => console.log("Service Worker failed:", err));
  });
}

