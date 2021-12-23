// import { Privilige } from '../model';
// import { Request, Response } from 'express';
// import { isNil } from 'lodash';

// export class PriviligeController {
//   public static getAll = async (req: Request, res: Response) => {
//     try {
//       const allPriviliges = await Privilige.getAll();
//       res.status(200).send(allPriviliges);
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   };

//   public static getPrivilige = async (req: Request, res: Response) => {
//     try {
//       const priviligeId = parseInt(req.params.id);
//       if (isNil(priviligeId)) {
//         return res.status(400).send('Bad request');
//       }
//       const privilige = await Privilige.getPrivilige(priviligeId);
//       if (!privilige) {
//         return res.status(404).send('Not Found');
//       }
//       return res.status(200).send(privilige);
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   };
//   public static getUsersWithPrivilige = async (req: Request, res: Response) => {
//     try {
//       const priviligeId = parseInt(req.params.id);
//       if (isNil(priviligeId)) {
//         return res.status(400).send('Bad request');
//       }
//       const users = await Privilige.getUsersWithPrivilige(priviligeId);
//       return res.status(200).send(users);
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   };
//   public static checkIfUserHasPrivilige = async (
//     req: Request,
//     res: Response
//   ) => {
//     try {
//       const priviligeId = parseInt(req.params.id);
//       const userGuid = req.params.userGuid;
//       if (isNil(priviligeId) || isNil(userGuid)) {
//         return res.status(400).send('Bad request');
//       }
//       const userHasPrivilige = await Privilige.checkIfUserHasPrivilige(
//         userGuid,
//         priviligeId
//       );
//       return res.status(200).send(userHasPrivilige);
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   };
//   public static addPrivilige = async (req: Request, res: Response) => {
//     try {
//       const name = req.body.name;
//       if (isNil(name)) {
//         return res.status(400).send('Bad request');
//       }
//       const newPrivilige = await Privilige.create(name);
//       return res.status(200).send(newPrivilige);
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   };
//   public static addPriviligeToUser = async (req: Request, res: Response) => {
//     try {
//       const priviligeId = parseInt(req.params.id);
//       const userGuid = req.params.userGuid;
//       if (isNil(priviligeId) || isNil(userGuid)) {
//         return res.status(400).send('Bad request');
//       }
//       await Privilige.addPriviligeToUser(priviligeId, userGuid);
//       return res.status(200).send('Ok');
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   };
//   public static removePrivilige = async (req: Request, res: Response) => {
//     try {
//       const priviligeId = parseInt(req.params.id);
//       if (isNil(priviligeId)) {
//         return res.status(400).send('Bad request');
//       }
//       await Privilige.remove(priviligeId);
//       return res.status(200).send('Ok');
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   };
//   public static removePriviligeFromUser = async (
//     req: Request,
//     res: Response
//   ) => {
//     try {
//       const priviligeId = parseInt(req.params.id);
//       const userGuid = req.params.userGuid;
//       if (isNil(priviligeId) || isNil(userGuid)) {
//         return res.status(400).send('Bad request');
//       }
//       await Privilige.removePriviligeFromUser(priviligeId, userGuid);
//       return res.status(200).send('Ok');
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   };
//   public static editPrivilige = async (req: Request, res: Response) => {
//     try {
//       const priviligeId = parseInt(req.params.id);
//       const name = req.body.name;
//       if (isNil(priviligeId) || isNil(name)) {
//         return res.status(400).send('Bad request');
//       }
//       const editedPrivilige = await Privilige.editPrivilige(priviligeId, name);
//       return res.status(200).send(editedPrivilige);
//     } catch (err) {
//       return res.status(500).send(err);
//     }
//   };
// }
