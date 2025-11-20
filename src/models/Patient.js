import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  dob: Date,
  gender: String,
  address: String,
  phone: String,
  allergies: [String],
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  medicalHistory: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Patient', PatientSchema);
