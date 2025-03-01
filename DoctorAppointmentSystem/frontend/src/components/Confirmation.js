import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Confirmation = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("appointment");
    if (data) {
      setAppointment(JSON.parse(data));
    } else {
      navigate("/"); // Redirect if no booking found
    }
  }, [navigate]);

  if (!appointment) {
    return null; // Prevent rendering if no data
  }

  return (
    <Container className="mt-4">
      <h2>Appointment Confirmed!</h2>
      <p><strong>Doctor ID:</strong> {appointment.doctorId}</p>
      <p><strong>Name:</strong> {appointment.name}</p>
      <p><strong>Email:</strong> {appointment.email}</p>
      <p><strong>Slot:</strong> {appointment.slot}</p>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </Container>
  );
};

export default Confirmation;
