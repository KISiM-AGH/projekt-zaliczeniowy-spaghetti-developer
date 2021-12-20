import { isNil } from 'lodash';
import db from '../db/db';

export class Advertisement {
  public static getAll(page?: number, limit?: number) {
    const dbConn = db().connection;
    return new Promise((resolve) => {
      dbConn.query(
        isNil(page) || isNil(limit)
          ? `SELECT * FROM Advertisements;`
          : `SELECT * FROM Advertisements LIMIT ${limit} OFFSET ${
              page * limit
            };`,
        (err, res) => {
          if (err) {
            throw err;
          }
          resolve(res);
        }
      );
    });
  }

  public static getAdvertisement(guid: string) {
    const dbConn = db().connection;
    return new Promise((resolve) => {
      dbConn.query(
        `SELECT * FROM Advertisements WHERE guid = '${guid}'`,
        (err, res) => {
          if (err) {
            throw err;
          }
          resolve(res[0]);
        }
      );
    });
  }

  public static createAdvertisement(
    guid: string,
    title: string,
    description: string,
    price: number,
    contact: string,
    address: string,
    mainImage: number,
    images: number[]
  ) {
    const dbConn = db().connection;
    return new Promise((resolve) => {
      const query = `INSERT INTO Advertisements(
        guid,
        title,
        createdOn,
        description,
        price,
        contact,
        address) VALUES(
          '${guid}',
          '${title}',
          NOW(),
          '${description}',
          ${price},
          '${contact}',
          '${address}'
        );
        ${
          (images && images.length) || mainImage
            ? `
           INSERT INTO AdvertisementImages(advertisementId,imageId,isMain,sequenceNumber) VALUES
        ${
          images
            ?.map((imageId, i) => `('${guid}', ${imageId}, false,${i + 1})`)
            .join(',') || ''
        }
        (${mainImage ? `'${guid}', ${mainImage}, true,${0}` : ''});
        `
            : ''
        }
        
        `;
      dbConn.query(query, async (err, res) => {
        if (err) {
          throw err;
        }
        resolve(await Advertisement.getAdvertisement(guid));
      });
    });
  }

  public static remove(advertisementId: string) {
    const dbConn = db().connection;
    return new Promise((resolve) => {
      dbConn.query(
        `DELETE FROM AdvertisementImage WHERE advertisementId = '${advertisementId}';
        DELETE FROM Advertisements WHERE id = '${advertisementId}';`,
        (err, res) => {
          if (err) {
            throw err;
          }
          resolve(true);
        }
      );
    });
  }

  public static editAdvertisement(
    advertisementId: string,
    title: string,
    description: string,
    price: number,
    contact: string,
    address: string,
    mainImage: number,
    images: string[]
  ) {
    const dbConn = db().connection;
    return new Promise((resolve) => {
      dbConn.query(
        `UPDATE Advertisements SET 
        title = '${title}',
        description = '${description}',
        price = ${price},
        contact = '${contact}',
        address = '${address}',
        WHERE guid = '${advertisementId}';
        DELETE AdvertisementImages WHERE advertisementId = '${advertisementId}';
        INSERT INTO AdvertisementImages(advertisementId,imageId,isMain,sequenceNumber) VALUES
        ${images
          .map(
            (imageId, i) => `('${advertisementId}', ${imageId}, false,${i + 1})`
          )
          .join(',')}
        ('${advertisementId}', ${mainImage}, true,${0});
        `,
        async (err, res) => {
          if (err) {
            throw err;
          }
          resolve(await Advertisement.getAdvertisement(advertisementId));
        }
      );
    });
  }
}
