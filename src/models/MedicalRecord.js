import mongoose from 'mongoose';

const MedicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  diagnosis: String,
  prescription: [{ medicine: String, dose: String, duration: String }],
  notes: String,
  attachments: [String], // URLs to scans/reports if needed
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('MedicalRecord', MedicalRecordSchema);
