const Sequelize = require("sequelize");

const sequelize = require("../utils/database.js");

const Row = sequelize.define("row", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isBooked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  vacency: Sequelize.INTEGER,
});

module.exports = Row;
