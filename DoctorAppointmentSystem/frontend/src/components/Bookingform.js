import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const BookingForm = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", slot: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store booking details in sessionStorage
    sessionStorage.setItem("appointment", JSON.stringify({ doctorId, ...formData }));

    navigate("/confirmation");
  };

  return (
    <Container className="mt-4">
      <h2>Book Appointment</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" required onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" required onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Slot</Form.Label>
          <Form.Control as="select" name="slot" required onChange={handleChange}>
            <option value="">Select</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="12:30 PM">12:30 PM</option>
          </Form.Control>
        </Form.Group>
        <Button className="mt-3" type="submit">Confirm Booking</Button>
      </Form>
    </Container>
  );
};

export default BookingForm;
