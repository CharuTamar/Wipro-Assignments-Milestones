const express = require("express");
const Doctor = require("../models/doctorModel");
const router = express.Router();

// Fetch all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Add doctors from doctors.json (One-time setup)
const doctorsData = require("../data/doctors.json");

router.post("/add", async (req, res) => {
  try {
    await Doctor.insertMany(doctorsData);
    res.json({ message: "Doctors added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding doctors" });
  }
});

module.exports = router;
