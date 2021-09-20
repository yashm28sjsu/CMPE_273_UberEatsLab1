const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// get current filename to exclude later from models files
const basename = path.basename(__filename);
// default env is 'development'
const env = process.env.NODE_ENV || 'development';
// get db config file
// eslint-disable-next-line import/no-dynamic-require
const config = require(path.join(__dirname, '/../config/config.json'))[env];
const db = {};

// get db instance
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// get all model files except this one and add to db object
fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// create associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
