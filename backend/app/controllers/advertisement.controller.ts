import { Advertisement } from '../model';
import { Request, Response } from 'express';
import { isNil } from 'lodash';
import { v4 as uuid } from 'uuid';

export class AdvertisementController {
  public static getAll = async (req: Request, res: Response) => {
    try {
      const { page, limit } = req.params;
      const advertisements = await Advertisement.getAll(
        parseInt(page),
        parseInt(limit)
      );
      res.status(200).send(advertisements);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public static getAdvertisement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (isNil(id)) {
        return res.status(400).send('Bad request');
      }
      const advertisement = await Advertisement.getAdvertisement(id);
      res.status(200).send(advertisement);
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
      const advertisement = await Advertisement.createAdvertisement(
        uuid(),
        title,
        description,
        price,
        contact,
        address,
        mainImage,
        images
      );
      res.status(200).send(advertisement);
    } catch (err) {
      console.log(err);

      return res.status(500).send(err);
    }
  };

  public static editAdvertisement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { title, description, price, contact, address, mainImage, images } =
        req.body;
      if (!title || !description || !price || !contact || !address) {
        return res.status(400).send('Bad request');
      }
      const advertisement = await Advertisement.editAdvertisement(
        id,
        title,
        description,
        price,
        contact,
        address,
        mainImage,
        images
      );
      res.status(200).send(advertisement);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public static deleteAdvertisement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (isNil(id)) {
        return res.status(400).send('Bad request');
      }
      await Advertisement.remove(id);
      return res.status(200).send('Ok');
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}
