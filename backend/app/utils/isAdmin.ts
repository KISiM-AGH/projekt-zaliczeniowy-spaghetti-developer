import Priviliges from '../model/priviliges';
import { Request, Response, NextFunction } from 'express';
import Users from 'app/model/users';

export const checkAdminPrivilige = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userGuid = req.body.token.userGuid;
  try {
    const user = (
      await Users.findOne({ where: { guid: userGuid }, include: Priviliges })
    )?.get();
    const isAdmin = !!user.Priviliges.find(
      (privilige: any) => privilige.code === 'admin-privilige'
    );
    if (!isAdmin) {
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    return res.status(500).send(err);
  }

  return next();
};
