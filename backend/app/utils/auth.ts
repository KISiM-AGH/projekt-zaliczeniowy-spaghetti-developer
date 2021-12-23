import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers[process.env.TOKEN_KEY || ''] as string;
  console.log(req.headers);

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY || '');
    req.body.token = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};
