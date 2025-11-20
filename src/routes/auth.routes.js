import express from 'express';
const router = express.Router();
import { register, login, me } from '../controllers/auth.controller.js';
import auth from '../middleware/auth.middleware.js';

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);

export default router;
