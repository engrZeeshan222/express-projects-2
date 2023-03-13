'use strict'
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/db");

class media extends Model {
  static associate(models) {
     // define association here
}}

media.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING,
    },
    link:{
        type: DataTypes.STRING,
    },
    thumbnail:{
        type: DataTypes.INTEGER,
    },
    published:{
        type: DataTypes.INTEGER,  
    },
  },
  {
    sequelize,
    modelName: "media",
    tableName: "media",
  }
);

/**
 * Sequelize sync creates table schema in the database
 * You can either choose to run Migrations manually or use automatic sync
 * Using both will cause an error
 */
let dataBaseSync  = async ()=>{
    try {
        await  media.sync({ alter: true , force : false });
        // process.exit(0); // exit code 0 is normal
        } catch (err) {
          // this will show the error
          console.log('There was an error at media model sync!  ', err.message);
    }  
}

dataBaseSync();
module.exports = media;



