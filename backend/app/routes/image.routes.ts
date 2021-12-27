import { ImageController } from '../controllers/image.controller';
import * as express from 'express';
import { verifyToken as auth } from '../utils/auth';

const imageRouter = express.Router();

imageRouter.post('/', auth, ImageController.addImage);
imageRouter.get('/:id', ImageController.getImage);

export { imageRouter };
