import { Users } from '.';
import db from '../db/db';
const Sequelize = require('sequelize');

const Password = db.define('Password', {
  hash: Sequelize.STRING,
  userGuid: {
    type: Sequelize.STRING,
    primaryKey: true,
    references: {
      model: Users,
      key: 'guid',
    },
  },
});
Password.belongsTo(Users, { foreignKey: 'userGuid', targetKey: 'guid' });
export default Password;
