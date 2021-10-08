import * as express from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyToken as auth } from '../utils/auth';
const router = express.Router();

router.put('/', auth, UserController.edit);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

export { router };
