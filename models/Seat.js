const Sequelize = require("sequelize");

const sequelize = require("../utils/database.js");

const Seat = sequelize.define("seat", {
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
});

module.exports = Seat;
