import { Request, Response } from 'express';
import { User } from '../model/user';
import { v4 as uuid } from 'uuid';
import { Password } from '../model';
import * as Jwt from 'jsonwebtoken';
import { AuthorizedUserDto } from '../dto';

export class UserController {
  public static edit = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email } = req.body;
      if (!firstName && !lastName && !email) {
        return res
          .status(400)
          .send('Body does not contain expected parameters.');
      }

      const updatedUser = await User.findOneAndUpdate(
        { guid: req.body.token.userGuid },
        { firstName, lastName, email }
      );
      return res.status(200).send(updatedUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public static register = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
        return res
          .status(400)
          .send('Body does not contain the required parameters.');
      }

      if (await User.findOne({ email })) {
        return res
          .status(409)
          .send('User with this email address already exist.');
      }

      const user = await User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        guid: uuid(),
      });
      await Password.create(user.guid!, password);

      return res.status(200).send(user);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };

  public static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .send('Body does not contain the required parameters.');
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(500).send('Internal Server Error.');
      }
      const userPassword = await Password.findOne(user.guid || '');
      if (await Password.compare(password, userPassword.hash)) {
        const token = Jwt.sign(
          {
            userGuid: user.guid,
            email,
          },
          process.env.TOKEN_KEY || '',
          {
            expiresIn: '1h',
          }
        );
        const authorizedUser: AuthorizedUserDto = { ...user, token };
        return res.status(200).send(authorizedUser);
      }
      res.status(400).send('Invalid credentials');
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };
}
