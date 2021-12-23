// import { BasicPriviliges, PriviligeDto } from '../dto';
// import db from '../db/db';

// export class Privilige {
//   public static checkIfUserHasPrivilige(
//     userGuid: string,
//     privilige: BasicPriviliges
//   ): Promise<boolean> {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `SELECT * FROM UserPriviliges WHERE userGuid = '${userGuid}' AND priviligeId = ${privilige} LIMIT 1`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(res.length);
//         }
//       );
//     });
//   }

//   public static getAll(): Promise<PriviligeDto[]> {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(`SELECT * FROM Priviliges`, (err, res) => {
//         if (err) {
//           throw err;
//         }
//         resolve(res);
//       });
//     });
//   }

//   public static getPrivilige(priviligeId: number): Promise<PriviligeDto> {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `SELECT * FROM Privilige WHERE id = ${priviligeId}`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(res[0]);
//         }
//       );
//     });
//   }

//   public static getUsersWithPrivilige(priviligeId: number): Promise<string[]> {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `SELECT userGuid FROM UserPriviliges WHERE id = ${priviligeId}`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(res);
//         }
//       );
//     });
//   }

//   public static create(name: string): Promise<PriviligeDto> {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `INSERT INTO Priviliges(name) VALUES ('${name}');SELECT LAST_INSERT_ID();`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve({ id: res, name });
//         }
//       );
//     });
//   }

//   public static addPriviligeToUser(priviligeId: number, userGuid: string) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `INSERT INTO UserPriviliges(id,userGuid) VALUES (${priviligeId},'${userGuid}');`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(true);
//         }
//       );
//     });
//   }

//   public static remove(priviligeId: number) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `DELETE FROM Priviliges WHERE id = ${priviligeId};
//         DELETE FROM UserPriviliges WHERE id = ${priviligeId};`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(true);
//         }
//       );
//     });
//   }

//   public static removePriviligeFromUser(priviligeId: number, userGuid: string) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `DELETE FROM UserPriviliges WHERE id = ${priviligeId} AND userGuid = '${userGuid}';`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(true);
//         }
//       );
//     });
//   }

//   public static editPrivilige(priviligeId: number, name: string) {
//     const dbConn = db().connection;
//     return new Promise((resolve) => {
//       dbConn.query(
//         `UPDATE Priviliges SET name = '${name}' WHERE id = ${priviligeId};`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           resolve(res[0]);
//         }
//       );
//     });
//   }
// }
