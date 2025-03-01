import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const appointmentData = sessionStorage.getItem("appointment");
  return appointmentData ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
