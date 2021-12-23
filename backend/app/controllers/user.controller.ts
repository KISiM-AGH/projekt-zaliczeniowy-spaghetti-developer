import { Request, Response } from 'express';
import { Users } from '../model/users';
import { v4 as uuid } from 'uuid';
// import { Password } from '../model';
import * as Jwt from 'jsonwebtoken';
import { AuthorizedUserDto } from '../dto';
import Password from '../model/password';
import { compare, hash } from 'bcryptjs';

export class UserController {
  // public static edit = async (req: Request, res: Response) => {
  //   try {
  //     const { firstName, lastName, email } = req.body;
  //     if (!firstName && !lastName && !email) {
  //       return res
  //         .status(400)
  //         .send('Body does not contain expected parameters.');
  //     }

  //     const updatedUser = await User.findOneAndUpdate(
  //       { guid: req.body.token.userGuid },
  //       { firstName, lastName, email }
  //     );
  //     return res.status(200).send(updatedUser);
  //   } catch (err) {
  //     return res.status(500).send(err);
  //   }
  // };

  public static register = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
        return res
          .status(400)
          .send('Body does not contain the required parameters.');
      }

      if (await Users.findOne({ where: { email } })) {
        return res
          .status(409)
          .send('User with this email address already exist.');
      }

      const user = await Users.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        guid: uuid(),
      });
      console.log(user.getDataValue('guid'));
      const hashed = await hash(password, 10);
      await Password.create({
        hash: hashed,
        userGuid: user.getDataValue('guid'),
      });

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

      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(401).send('User not found.');
      }
      const userPassword = await Password.findOne({
        where: { userGuid: user.getDataValue('guid') },
      });
      if (await compare(password, userPassword?.getDataValue('hash'))) {
        const token = Jwt.sign(
          {
            userGuid: user.getDataValue('guid'),
            email,
          },
          process.env.TOKEN_KEY || '',
          {
            expiresIn: '1h',
          }
        );
        const authorizedUser: AuthorizedUserDto = { ...user.get(), token };
        return res.status(200).send(authorizedUser);
      }
      res.status(400).send('Invalid credentials');
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  };
}
