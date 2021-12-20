import db from '../db/db';

export class Image {
  public static get(guid: string) {
    const dbConn = db().connection;
    return new Promise((resolve) => {
      dbConn.query(
        `SELECT * FROM Images WHERE guid = '${guid}';`,
        (err, res) => {
          if (err) {
            throw err;
          }
          resolve(res);
        }
      );
    });
  }

  public static add(guid: string, image: Blob) {
    const dbConn = db().connection;
    return new Promise((resolve) => {
      dbConn.query(
        `INSERT INTO Images(
        guid,
        image
        ) VALUES(
          '${guid}',
          ${image},
        );
        `,
        async (err, res) => {
          if (err) {
            throw err;
          }
          resolve(await Image.get(guid));
        }
      );
    });
  }

  public static delete(guid: string) {
    const dbConn = db().connection;
    return new Promise((resolve) => {
      dbConn.query(
        `DELETE FROM AdvertisementImage WHERE imageId = '${guid}';
        DELETE FROM Images WHERE guid = '${guid}';`,
        (err, res) => {
          if (err) {
            throw err;
          }
          resolve(true);
        }
      );
    });
  }
}
