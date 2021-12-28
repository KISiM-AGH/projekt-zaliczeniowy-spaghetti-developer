import db from '../db/db';
const Sequelize = require('sequelize');

const Users = db.define('Users', {
  guid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
});

export default Users;
