import Advertisements from '../model/advertisements';
import Images from '../model/images';
import Users from '../model/users';
import Priviliges from '../model/priviliges';
import { Request, Response } from 'express';
import { isNil } from 'lodash';
import { v4 as uuid } from 'uuid';
import { ImageData } from '../dto';

export class AdvertisementController {
  public static getAll = async (req: Request, res: Response) => {
    try {
      const advertisements = await Advertisements.findAll({
        include: { model: Images, as: 'images' },
      });
      res.status(200).send(advertisements);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  };

  public static getAdvertisement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (isNil(id)) {
        return res.status(400).send('Bad request');
      }
      const advertisement = await Advertisements.findOne({
        where: { guid: id },
        include: Users,
      });

      if (isNil(advertisement)) {
        return res.status(401).send('Advertisement not found.');
      }
      const images = await Images.findAll({
        where: { advertisementGuid: advertisement?.getDataValue('guid') },
      });
      res.status(200).send({ ...advertisement.get(), images });
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public static editAdvertisement = async (req: Request, res: Response) => {
    try {
      const token = req.body.token;
      const id = req.params.id;
      const advertisement = (
        await Advertisements.findOne({
          where: { guid: id },
          include: Users,
        })
      )?.get();

      if (isNil(id)) {
        return res.status(400).send('Bad request');
      }

      if (isNil(advertisement)) {
        return res.status(401).send('Advertisement not found.');
      }
      if (advertisement.userGuid !== token.userGuid) {
        return res.status(403).send('Unauthorized.');
      }

      const { title, description, price, contact, address } = req.body;

      if (!title || !description || isNil(price) || !contact || !address) {
        return res.status(400).send('Bad request');
      }

      const data = {
        ...advertisement,
        title: title ?? advertisement.title,
        description: description ?? advertisement.description,
        price: price ?? advertisement.price,
        contact: contact ?? advertisement.contact,
        address: address ?? advertisement.address,
      };
      await Advertisements.update(data, {
        where: { guid: advertisement.guid },
      });

      const newAdvertisement = await Advertisements.findOne({
        where: { guid: id },
        include: Users,
      });
      res.status(200).send(newAdvertisement);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal server error.');
    }
  };

  public static createAdvertisement = async (req: Request, res: Response) => {
    try {
      const token = req.body.token;
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
        userGuid: token.userGuid,
      });
      if (mainImage)
        await Images.create({
          ...mainImage,
          orderNumber: 0,
          AdvertisementGuid: guid,
        });
      if (images && images.length > 0)
        await Images.bulkCreate([
          ...images.map((image: ImageData, i: number) => ({
            ...image,
            orderNumber: i + 1,
            AdvertisementGuid: guid,
          })),
        ]);
      res.status(200).send(advertisement);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
    }
  };

  public static deleteAdvertisement = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const token = req.body.token;
      const user = (
        await Users.findOne({
          where: { email: token.email },
          include: Priviliges,
        })
      )?.get();
      const isAdmin = !!user.Priviliges.find(
        (privilige: any) => privilige.code === 'admin-privilige'
      );

      if (isNil(id)) {
        return res.status(400).send('Bad request');
      }
      const advertisement = (
        await Advertisements.findOne({
          where: { guid: id },
          include: [Users, { model: Images, as: 'images' }],
        })
      )?.get();

      if (advertisement.userGuid === token.userGuid || isAdmin) {
        Advertisements.destroy({
          where: { guid: id },
          cascade: true,
        });
        return res.status(200).send({ status: 'Ok' });
      } else {
        return res.status(403).send('Unauthorized');
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
    }
  };
}
