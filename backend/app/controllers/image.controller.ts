import { Request, Response } from 'express';
import { Image } from '../model';
import { v4 as uuid } from 'uuid';

interface MulterRequest extends Request {
  files: any;
}

export class ImageController {
  public static addImage = async (req: Request, res: Response) => {
    try {
      const image: Blob = (req as MulterRequest).files.image as any;

      if (!image) {
        return res.status(400).send('Bad request');
      }
      const imageObject = await Image.add(uuid(), image as Blob);
      res.status(200).send(imageObject);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public static getImage = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).send('Bad request');
      }
      const image = await Image.get(id);
      res.status(200).send(image);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
  public static deleteImage = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).send('Bad request');
      }
      await Image.delete(id);
      res.status(200).send('OK');
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}
