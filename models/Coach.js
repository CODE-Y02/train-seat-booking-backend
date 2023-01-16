const Sequelize = require("sequelize");

const sequelize = require("../utils/database.js");

const Coach = sequelize.define("coach", {
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
  totalSeats: {
    type: Sequelize.INTEGER,
  },
  available: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Coach;
