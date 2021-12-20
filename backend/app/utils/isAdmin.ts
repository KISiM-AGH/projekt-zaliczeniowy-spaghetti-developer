import { BasicPriviliges } from '../dto';
import { Request, Response, NextFunction } from 'express';
import { Privilige } from '../model/privilige';

export const checkAdminPrivilige = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userGuid = req.body.token.userGuid;

  try {
    if (
      !(await Privilige.checkIfUserHasPrivilige(
        userGuid,
        BasicPriviliges.Admin
      ))
    ) {
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    return res.status(500).send(err);
  }

  return next();
};
