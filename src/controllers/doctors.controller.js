import Doctor from '../models/Doctor.js';
import User from '../models/User.js';

export const createDoctor = async (req, res) => {
  try {
    const { userId, specialization, department, yearsOfExperience, schedule } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const existing = await Doctor.findOne({ user: userId });
    if (existing) return res.status(400).json({ message: 'Doctor profile already exists' });
    const doctor = new Doctor({ user: userId, specialization, department, yearsOfExperience, schedule });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const doc = await Doctor.findById(req.params.id).populate('user', 'name email');
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
