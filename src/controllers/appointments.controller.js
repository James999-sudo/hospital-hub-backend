import Appointment from '../models/Appointment.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';

export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, reason } = req.body;
    // basic checks
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);
    if (!patient || !doctor) return res.status(404).json({ message: 'Patient or Doctor not found' });
    const appt = new Appointment({ patient: patientId, doctor: doctorId, date, reason });
    await appt.save();
    res.status(201).json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const filter = {};
    // allow filtering by doctor, patient or status via query
    if (req.query.doctor) filter.doctor = req.query.doctor;
    if (req.query.patient) filter.patient = req.query.patient;
    if (req.query.status) filter.status = req.query.status;
    const appts = await Appointment.find(filter)
      .populate('patient', 'user')
      .populate('doctor', 'user')
      .sort({ date: 1 });
    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
