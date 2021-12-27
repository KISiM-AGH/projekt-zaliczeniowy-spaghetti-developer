import db from '../db/db';
import Users from './users';
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
Users.hasMany(Advertisements);
export default Advertisements;
