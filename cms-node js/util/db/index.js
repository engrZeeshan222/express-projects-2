require("dotenv").config();
const { Sequelize } = require('sequelize');

/** Config Sequelize with MySQL*/
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
  }
);

/** connect*/
async function connect (){
try {
  await sequelize.authenticate();
  console.log("Connection to Database has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
};


module.exports.sequelize = sequelize;
module.exports.connect = connect;

