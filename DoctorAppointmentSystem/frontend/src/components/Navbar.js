import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

const NavigationBar = () => {
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    // Check if appointment exists in sessionStorage
    const appointment = sessionStorage.getItem("appointment");
    setIsBooked(!!appointment);
  }, []);

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#ADD8E6" }}> {/* Light Blue */}
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", color: "#000" }}>
          Doctor Appointments
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" style={{ color: "#000" }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/booking/1" style={{ color: "#000" }}>Booking</Nav.Link>
            {isBooked && <Nav.Link as={Link} to="/confirmation" style={{ color: "#000" }}>Confirmation</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
