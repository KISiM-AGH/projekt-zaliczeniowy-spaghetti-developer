import { Application } from 'express';
import { router as userRoutes } from './user.routes';
import { advertisementRouter } from './adverisement.routes';
import { imageRouter } from './image.routes';

export const setRoutes = (app: Application) => {
  app.use('/api/user', userRoutes);
  app.use('/api/advertisements', advertisementRouter);
  app.use('/api/images', imageRouter);
};
