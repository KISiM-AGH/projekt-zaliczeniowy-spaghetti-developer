// import db from '../db/db';

// export class Image {
//   public static get(guid: string) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `SELECT * FROM Images WHERE guid = '${guid}';`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(res);
//         }
//       );
//     });
//   }

//   public static add(guid: string, image: Blob) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `INSERT INTO Images(
//         guid,
//         image
//         ) VALUES(
//           '${guid}',
//           ${image},
//         );
//         `,
//         async (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(await Image.get(guid));
//         }
//       );
//     });
//   }

//   public static delete(guid: string) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `DELETE FROM AdvertisementImage WHERE imageId = '${guid}';
//         DELETE FROM Images WHERE guid = '${guid}';`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(true);
//         }
//       );
//     });
//   }
// }

import db from '../db/db';
import Advertisements from './advertisements';
const Sequelize = require('sequelize');

const Images = db.define('Images', {
  guid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  orderNumber: Sequelize.INTEGER,
  advertisementGuid: {
    type: Sequelize.STRING,
    primaryKey: true,
    references: {
      model: Advertisements,
      key: 'guid',
    },
  },
});
Images.belongsTo(Advertisements, {
  foreignKey: 'advertisementGuid',
  targetKey: 'guid',
});
export default Images;
