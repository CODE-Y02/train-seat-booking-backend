const Sequelize = require("sequelize");

const dotenv = require("dotenv");

dotenv.config(".env");

console.log(process.env.db_uri);
let dbConfig = [process.env.db_uri];

if (!dbConfig[0]) {
  dbConfig = [
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASS,
    {
      dialect: "mysql",
      host: process.env.DB_HOST,
    },
  ];
}

const sequelize = new Sequelize(...dbConfig); // Example for postgres

module.exports = sequelize;
