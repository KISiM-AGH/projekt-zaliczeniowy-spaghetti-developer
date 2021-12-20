import { Application } from 'express';
import { router as userRoutes } from './user.routes';
import { priviligeRouter } from './privilige.routes';
import { advertisementRouter } from './adverisement.routes';
import { imageRouter } from './image.routes';

export const setRoutes = (app: Application) => {
  app.use('/api/user', userRoutes);
  app.use('/api/privilige', priviligeRouter);
  app.use('/api/advertisements', advertisementRouter);
  app.use('/api/images', imageRouter);
};
