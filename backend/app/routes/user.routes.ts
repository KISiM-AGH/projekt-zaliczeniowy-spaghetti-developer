import * as express from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyToken as auth } from '../utils/auth';
const router = express.Router();

router.get('/', auth, UserController.user);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

export { router };
