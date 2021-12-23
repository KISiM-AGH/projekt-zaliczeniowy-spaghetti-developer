// import { UploadedFile } from 'express-fileupload';
// import { ImageData } from '../dto';
// import { isNil } from 'lodash';
// import db from '../db/db';

// export class Advertisement {
//   public static getAll(page?: number, limit?: number) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         isNil(page) || isNil(limit)
//           ? `SELECT * FROM Advertisements;`
//           : `SELECT * FROM Advertisements LIMIT ${limit} OFFSET ${
//               page * limit
//             };`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(res);
//         }
//       );
//     });
//   }

//   public static getAdvertisement(guid: string) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `SELECT * FROM Advertisements WHERE guid = '${guid}'`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(res[0]);
//         }
//       );
//     });
//   }

//   public static createAdvertisement(
//     guid: string,
//     title: string,
//     description: string,
//     price: number,
//     contact: string,
//     address: string,
//     mainImage: ImageData,
//     images: ImageData[]
//   ) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       const query = `
//       INSERT INTO Advertisements(
//         guid,
//         title,
//         createdOn,
//         description,
//         price,
//         contact,
//         address) VALUES(
//           '${guid}',
//           '${title}',
//           NOW(),
//           '${description}',
//           ${price},
//           '${contact}',
//           '${address}'
//         );
//         ${
//           (images && images.length) || mainImage
//             ? `
//     INSERT INTO Images(advertisementGuid,guid,name,orderNumber) VALUES
//      (${
//        //  mainImage ? `"${guid}", "${mainImage.guid}", "${mainImage.name}",0` : ''
//        mainImage ? `"XD", "XD", "XD",0` : ''
//      })${images.length ? ',' : ''}${
//                 images
//                   ?.map(
//                     (image, i) =>
//                       `("${guid}", "${image.guid}", "${image.name}",${i + 1})`
//                   )
//                   .join(',') || ''
//               }`
//             : ''
//         };`;
//       console.log(mainImage);

//       console.log(query);

//       dbConn.query(query, async (err, res) => {
//         if (err) {
//           throw err;
//         }
//         resolve(await Advertisement.getAdvertisement(guid));
//       });
//     });
//   }

//   public static uploadFile(guid: string, file: UploadedFile) {
//     const ext = file.name.split('.');
//     file.mv(`./uploads/${guid}.${ext[ext.length - 1]}`);
//   }

//   public static remove(advertisementId: string) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `DELETE FROM AdvertisementImage WHERE advertisementId = '${advertisementId}';
//         DELETE FROM Advertisements WHERE id = '${advertisementId}';`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(true);
//         }
//       );
//     });
//   }

//   public static editAdvertisement(
//     advertisementId: string,
//     title: string,
//     description: string,
//     price: number,
//     contact: string,
//     address: string,
//     mainImage: number,
//     images: string[]
//   ) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `UPDATE Advertisements SET
//         title = '${title}',
//         description = '${description}',
//         price = ${price},
//         contact = '${contact}',
//         address = '${address}',
//         WHERE guid = '${advertisementId}';
//         DELETE AdvertisementImages WHERE advertisementId = '${advertisementId}';
//         INSERT INTO AdvertisementImages(advertisementId,imageId,isMain,sequenceNumber) VALUES
//         ${images
//           .map(
//             (imageId, i) => `('${advertisementId}', ${imageId}, false,${i + 1})`
//           )
//           .join(',')}
//         ('${advertisementId}', ${mainImage}, true,${0});
//         `,
//         async (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(await Advertisement.getAdvertisement(advertisementId));
//         }
//       );
//     });
//   }
// }

import { Users } from '.';
import db from '../db/db';
const Sequelize = require('sequelize');

const Advertisements = db.define('Advertisements', {
  guid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.DECIMAL(10, 2),
  contact: Sequelize.STRING,
  address: Sequelize.STRING,
  userGuid: {
    type: Sequelize.STRING,
    references: {
      model: Users,
      key: 'guid',
    },
  },
});
Advertisements.belongsTo(Users, { foreignKey: 'userGuid', targetKey: 'guid' });
export default Advertisements;
