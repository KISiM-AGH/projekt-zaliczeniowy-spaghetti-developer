import Advertisements from '../model/advertisements';
import { Request, Response } from 'express';
import { isNil } from 'lodash';
import { v4 as uuid } from 'uuid';
import Images from '../model/images';
import { ImageData } from '../dto';

export class AdvertisementController {
  //   public static getAll = async (req: Request, res: Response) => {
  //     try {
  //       const { page, limit } = req.params;
  //       const advertisements = await Advertisement.getAll(
  //         parseInt(page),
  //         parseInt(limit)
  //       );
  //       res.status(200).send(advertisements);
  //     } catch (err) {
  //       return res.status(500).send(err);
  //     }
  //   };

  public static getAdvertisement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (isNil(id)) {
        return res.status(400).send('Bad request');
      }
      const advertisement = await Advertisements.findOne({
        where: { guid: id },
      });
      if (isNil(advertisement)) {
        return res.status(401).send('Advertisement not found');
      }
      const images = await Images.findAll({
        where: { advertisementGuid: advertisement?.getDataValue('guid') },
      });
      res.status(200).send({ ...advertisement.get(), images });
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public static createAdvertisement = async (req: Request, res: Response) => {
    try {
      const { title, description, price, contact, address, mainImage, images } =
        req.body;
      if (!title || !description || isNil(price) || !contact || !address) {
        return res.status(400).send('Bad request');
      }
      const guid = uuid();
      const advertisement = await Advertisements.create({
        guid,
        title,
        description,
        price,
        contact,
        address,
      });
      await Images.create({
        ...mainImage,
        orderNumber: 0,
        advertisementGuid: guid,
      });
      await Images.bulkCreate([
        ...images.map((image: ImageData, i: number) => ({
          ...image,
          orderNumber: i + 1,
          advertisementGuid: guid,
        })),
      ]);
      res.status(200).send(advertisement);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  //   public static addFile = async (req: Request, res: Response) => {
  //     try {
  //       const file = req.files?.thumbnails as UploadedFile;
  //       if (!file) {
  //         return res.status(400).send('Bad request');
  //       }
  //       const guid = uuid();
  //       await Advertisement.uploadFile(guid, file);
  //       res.status(200).send({ guid });
  //     } catch (err) {
  //       return res.status(500).send(err);
  //     }
  //   };

  //   public static editAdvertisement = async (req: Request, res: Response) => {
  //     try {
  //       const id = req.params.id;
  //       const { title, description, price, contact, address, mainImage, images } =
  //         req.body;
  //       if (!title || !description || !price || !contact || !address) {
  //         return res.status(400).send('Bad request');
  //       }
  //       const advertisement = await Advertisement.editAdvertisement(
  //         id,
  //         title,
  //         description,
  //         price,
  //         contact,
  //         address,
  //         mainImage,
  //         images
  //       );
  //       res.status(200).send(advertisement);
  //     } catch (err) {
  //       return res.status(500).send(err);
  //     }
  //   };

  //   public static deleteAdvertisement = async (req: Request, res: Response) => {
  //     try {
  //       const id = req.params.id;
  //       if (isNil(id)) {
  //         return res.status(400).send('Bad request');
  //       }
  //       await Advertisement.remove(id);
  //       return res.status(200).send('Ok');
  //     } catch (err) {
  //       return res.status(500).send(err);
  //     }
  //   };
}
