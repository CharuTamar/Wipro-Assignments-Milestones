const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  slot: { type: String, required: true },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
