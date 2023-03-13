require("dotenv").config();
const Sequelize = require('sequelize');

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    migrationsStorage: "sequelize",
        // The retry config if Deadlock Happened
        retry: {
          match: [Sequelize.ConnectionError,
          Sequelize.DatabaseError,
          Sequelize.ConnectionTimedOutError,
          Sequelize.TimeoutError,/Deadlock/i],
          max: 5, // Maximum rety  times
          backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
          backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
        },
        logging : console.log
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    migrationsStorage: "sequelize",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    migrationsStorage: "sequelize",
  },
};
