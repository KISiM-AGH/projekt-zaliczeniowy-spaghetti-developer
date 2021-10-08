import { randomUUID } from 'crypto';
import { isArray, isUndefined } from 'lodash';
import { UserDto } from '../dto';
import db from '../db/db';

export interface UserFilters {
  guid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UserEditData extends UserFilters {}

export class User {
  public static create(user: UserDto): Promise<UserDto> {
    const dbConn = db().connection;
    const userData = { ...user, guid: user.guid || randomUUID() };
    return new Promise((resolve) => {
      dbConn.query(`INSERT INTO Users SET ?`, userData, async (err, res) => {
        if (err) {
          throw err;
        }
        const newUser = await User.findOne(user);
        if (!newUser) {
          throw 'User not created';
        }
        resolve(newUser);
      });
    });
  }

  public static async findOne(filters: UserFilters): Promise<UserDto | null> {
    const user = await User.findBy(filters, 1);
    return isArray(user) ? user[0] : user;
  }

  public static findBy(
    filters: UserFilters,
    limit: number
  ): Promise<UserDto | UserDto[] | null> {
    const dbConn = db().connection;
    const mappedFilters = this.mapFiltersToUpdateQuery(filters);
    return new Promise((resolve) => {
      dbConn.query(
        `SELECT * FROM Users WHERE ${mappedFilters} LIMIT ${limit}`,
        (err, res) => {
          if (err) {
            throw err;
          }
          resolve(res);
        }
      );
    });
  }

  public static findOneAndUpdate(filters: UserFilters, data: UserEditData) {
    const dbConn = db().connection;
    const mappedFilters = this.mapFiltersToUpdateQuery(filters);
    return new Promise((resolve) => {
      dbConn.query(
        `UPDATE Users SET ${User.mapDataToUpdateQuery(
          data
        )} WHERE ${mappedFilters} LIMIT 1`,
        async (err, res) => {
          if (err) {
            throw err;
          }
          const editedUser = await User.findOne(filters);
          if (!editedUser) {
            throw 'User not updated';
          }
          resolve(editedUser);
          resolve(res);
        }
      );
    });
  }

  private static mapDataToUpdateQuery(data: UserEditData): string {
    return Object.entries(data)
      .reduce((acc: string[], [key, value]) => {
        return isUndefined(value) ? acc : [...acc, `${key} = '${value}'`];
      }, [])
      .join(', ');
  }

  private static mapFiltersToUpdateQuery(filters: UserFilters): string {
    return Object.entries(filters)
      .map(([key, value]) => {
        return `${key} = '${value}'`;
      })
      .join(' AND ');
  }
}
