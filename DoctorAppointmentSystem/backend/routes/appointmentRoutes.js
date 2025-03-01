const express = require("express");
const Appointment = require("../models/appointmentModel");
const router = express.Router();

// Book an appointment
router.post("/", async (req, res) => {
  const { doctorId, patientName, email, slot } = req.body;
  
  if (!doctorId || !patientName || !email || !slot) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const appointment = new Appointment({ doctorId, patientName, email, slot });
    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId", "name specialty");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
