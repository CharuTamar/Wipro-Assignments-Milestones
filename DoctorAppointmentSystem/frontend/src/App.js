import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import BookingForm from "./components/Bookingform";
import Confirmation from "./components/Confirmation";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar"; // Navigation bar

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navigation bar for all pages */}
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/booking/:doctorId" element={<BookingForm />} />
        <Route path="/confirmation" element={<ProtectedRoute />}>
          <Route path="" element={<Confirmation />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
