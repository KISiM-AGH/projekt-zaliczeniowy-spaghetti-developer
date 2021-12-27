import Priviliges from '../model/priviliges';
import { Request, Response } from 'express';
import { isNil } from 'lodash';

export class PriviligeController {
  public static addPrivilige = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (isNil(name)) {
        return res.status(400).send('Bad request');
      }
      const newPrivilige = await Priviliges.create({ name });
      return res.status(200).send(newPrivilige);
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}
