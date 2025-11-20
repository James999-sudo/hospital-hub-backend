import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  specialization: String,
  department: String,
  yearsOfExperience: Number,
  schedule: [{
    day: String, // "Monday"
    from: String, // "09:00"
    to: String // "17:00"
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Doctor', DoctorSchema);
