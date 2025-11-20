import express from 'express';
const router = express.Router();
import * as apptCtrl from '../controllers/appointments.controller.js';
import auth from '../middleware/auth.middleware.js';
import permit from '../middleware/roles.middleware.js';

router.post('/', auth, permit('patient', 'receptionist'), apptCtrl.createAppointment);
router.get('/', auth, apptCtrl.getAppointments);
router.put('/:id', auth, permit('admin', 'doctor', 'receptionist'), apptCtrl.updateAppointment);

export default router;
