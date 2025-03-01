import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotesProvider } from "./context/NotesContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Notes from "./pages/Notes";

function App() {
  return (
    <NotesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </Router>
    </NotesProvider>
  );
}

export default App;
