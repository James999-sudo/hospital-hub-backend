import express from 'express';
const router = express.Router();
import * as patientsCtrl from '../controllers/patients.controller.js';
import auth from '../middleware/auth.middleware.js';
import permit from '../middleware/roles.middleware.js';

router.post('/', auth, permit('admin', 'receptionist'), patientsCtrl.createPatient);
router.get('/', auth, permit('admin', 'doctor', 'nurse'), patientsCtrl.getPatients);
router.get('/:id', auth, permit('admin', 'doctor', 'nurse', 'patient'), patientsCtrl.getPatient);
router.put('/:id', auth, permit('admin', 'doctor', 'nurse', 'patient'), patientsCtrl.updatePatient);

export default router;
