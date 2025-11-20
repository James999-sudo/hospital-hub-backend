import express from 'express';
const router = express.Router();
import * as recordsCtrl from '../controllers/records.controller.js';
import auth from '../middleware/auth.middleware.js';
import permit from '../middleware/roles.middleware.js';

router.post('/', auth, permit('doctor', 'admin'), recordsCtrl.createRecord);
router.get('/patient/:patientId', auth, permit('doctor', 'admin', 'nurse', 'patient'), recordsCtrl.getRecordsByPatient);

export default router;
