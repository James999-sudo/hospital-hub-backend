import Patient from '../models/Patient.js';
import User from '../models/User.js';

export const createPatient = async (req, res) => {
  try {
    const { userId, dob, gender, address, phone, allergies, emergencyContact } = req.body;
    // ensure user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const existing = await Patient.findOne({ user: userId });
    if (existing) return res.status(400).json({ message: 'Patient profile already exists' });
    const patient = new Patient({ user: userId, dob, gender, address, phone, allergies, emergencyContact });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('user', 'name email role');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('user', 'name email');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
