import db from '../db/db';
const Sequelize = require('sequelize');

export interface UserFilters {
  guid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UserEditData extends UserFilters {}

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
