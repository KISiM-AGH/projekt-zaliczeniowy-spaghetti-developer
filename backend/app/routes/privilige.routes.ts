import * as express from 'express';
import { verifyToken as auth } from '../utils/auth';
import { checkAdminPrivilige as isAdmin } from '../utils/isAdmin';
import { PriviligeController } from '../controllers/privilige.controller';
const priviligeRouter = express.Router();

priviligeRouter.get('/', auth, isAdmin, PriviligeController.getAll);
priviligeRouter.get('/:id', auth, isAdmin, PriviligeController.getPrivilige);
priviligeRouter.get(
  '/:id/users',
  auth,
  isAdmin,
  PriviligeController.getUsersWithPrivilige
);
priviligeRouter.get(
  '/:id/users/:userGuid',
  auth,
  isAdmin,
  PriviligeController.checkIfUserHasPrivilige
);
priviligeRouter.post('/', auth, isAdmin, PriviligeController.addPrivilige);
priviligeRouter.post(
  '/:id/users/:userGuid',
  auth,
  isAdmin,
  PriviligeController.addPriviligeToUser
);
priviligeRouter.delete(
  '/:id',
  auth,
  isAdmin,
  PriviligeController.removePrivilige
);
priviligeRouter.delete(
  '/:id/users/:userGuid',
  auth,
  isAdmin,
  PriviligeController.removePriviligeFromUser
);
priviligeRouter.put('/:id', auth, isAdmin, PriviligeController.editPrivilige);

export { priviligeRouter };
