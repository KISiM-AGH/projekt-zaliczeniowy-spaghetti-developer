import * as express from 'express';
import { verifyToken as auth } from '../utils/auth';
import { AdvertisementController } from '../controllers/advertisement.controller';
import { checkAdminPrivilige as isAdmin } from '../utils/isAdmin';
const advertisementRouter = express.Router();

advertisementRouter.get('/', AdvertisementController.getAll);
advertisementRouter.get('/:id', AdvertisementController.getAdvertisement);
advertisementRouter.post(
  '/',
  auth,
  AdvertisementController.createAdvertisement
);
// advertisementRouter.put(
//   '/:id',
//   auth,
//   AdvertisementController.editAdvertisement
// );
advertisementRouter.delete(
  '/:id',
  auth,
  AdvertisementController.deleteAdvertisement
);

export { advertisementRouter };
