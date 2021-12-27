import Images from '../model/images';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuid } from 'uuid';
const path = require('path');

export class ImageController {
  public static addImage = async (req: Request, res: Response) => {
    try {
      const file = req.files?.thumbnails as UploadedFile;
      if (!file) {
        return res.status(400).send('Bad request');
      }
      const guid = uuid();
      const ext = file.name.split('.');
      file.mv(`./uploads/${guid}.${ext[ext.length - 1]}`);
      res.status(200).send({ guid });
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
      const image = await Images.findOne({ where: { guid: id } });
      const imageData = image?.get();
      const ext = imageData.name.split('.');
      let imagePath = `${__dirname}\\..\\..\\uploads\\${imageData.guid}.${
        ext[ext.length - 1]
      }`;
      imagePath = path.resolve(imagePath);
      res.status(200).type('png').sendFile(imagePath);
    } catch (err) {
      console.log(err);

      return res.status(500).send('Internal server error.');
    }
  };
}
