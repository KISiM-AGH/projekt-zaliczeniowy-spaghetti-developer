import { hash, compare } from 'bcryptjs';
import db from '../db/db';
import { PasswordDto } from '../dto/';

export class Password {
  public static async create(
    userGuid: string,
    password: string
  ): Promise<boolean> {
    const dbConn = db().connection;
    const passwordData = {
      userGuid: userGuid,
      hash: await hash(password, 10),
    };
    return new Promise((resolve) => {
      dbConn.query(`INSERT INTO Passwords SET ?`, passwordData, (err, res) => {
        if (err) {
          throw err;
        }
        resolve(res);
      });
    });
  }

  public static findOne(userGuid: string): Promise<PasswordDto> {
    const dbConn = db().connection;
    return new Promise((resolve) => {
      dbConn.query(
        `SELECT * FROM Passwords WHERE userGuid = '${userGuid}' LIMIT 1`,
        (err, res) => {
          if (err) {
            throw err;
          }
          resolve(res[0]);
        }
      );
    });
  }

  public static compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
