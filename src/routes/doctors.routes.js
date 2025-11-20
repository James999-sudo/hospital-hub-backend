import express from 'express';
const router = express.Router();
import * as doctorsCtrl from '../controllers/doctors.controller.js';
import auth from '../middleware/auth.middleware.js';
import permit from '../middleware/roles.middleware.js';

router.post('/', auth, permit('admin'), doctorsCtrl.createDoctor);
router.get('/', auth, doctorsCtrl.getDoctors);
router.get('/:id', auth, doctorsCtrl.getDoctor);

export default router;
