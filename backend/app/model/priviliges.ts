import db from '../db/db';
import Users from './users';
const Sequelize = require('sequelize');

const Priviliges = db.define('Priviliges', {
  code: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
});
Priviliges.belongsToMany(Users, { through: 'User_Priviliges' });
Users.belongsToMany(Priviliges, { through: 'User_Priviliges' });

export default Priviliges;
