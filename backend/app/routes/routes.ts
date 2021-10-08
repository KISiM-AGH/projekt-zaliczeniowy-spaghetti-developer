import { Application } from 'express';
import { router as userRoutes } from './user.routes';

export const setRoutes = (app: Application) => {
  app.use('/api/user', userRoutes);
};
