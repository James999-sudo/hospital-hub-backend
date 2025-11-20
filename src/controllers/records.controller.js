import MedicalRecord from '../models/MedicalRecord.js';

export const createRecord = async (req, res) => {
  try {
    const { patient, doctor, diagnosis, prescription, notes, attachments } = req.body;
    const record = new MedicalRecord({ patient, doctor, diagnosis, prescription, notes, attachments });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRecordsByPatient = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ patient: req.params.patientId }).populate('doctor', 'user');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
