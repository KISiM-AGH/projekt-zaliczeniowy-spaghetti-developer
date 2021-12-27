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
});
Images.belongsTo(Advertisements, {
  foreignKey: 'AdvertisementGuid',
  targetKey: 'guid',
});
Advertisements.hasMany(Images, {
  as: 'images',
  onDelete: 'cascade',
});
export default Images;
