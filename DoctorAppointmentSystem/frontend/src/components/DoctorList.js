import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors")  
      .then(response => {
        console.log("API Response:", response.data);  
        setDoctors(response.data);
      })
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

  return (
    <Container>
      <h2 className="mt-4">Available Doctors</h2>
      <Row>
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <Col key={doctor.id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{doctor.name}</Card.Title>
                  <Card.Text>Specialty: {doctor.specialty}</Card.Text>
                  <Link to={`/booking/${doctor.id}`}>
                    <Button variant="primary">Book Appointment</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Loading doctors...</p>  // message if no data
        )}
      </Row>
    </Container>
  );
};

export default DoctorList;
