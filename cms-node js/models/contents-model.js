'use strict'

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/db");

class contents extends Model {
  static associate(models) {}
}

contents.init(
  {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    },
    content:{
        type: DataTypes.STRING,
    },
    link:{
        type: DataTypes.STRING,
    },
    type:{
        type: DataTypes.INTEGER,
    },
    slug:{
        type: DataTypes.STRING,
    },
    published:{
        type: DataTypes.INTEGER,  
    },
  },
  {
    sequelize,
    modelName: "contents",
    tableName: "contents",
  }
);

/**
 * Sequelize sync creates table schema in the database
 * You can either choose to run Migrations manually or use automatic sync
 * Using both will cause an error
 */
let dataBaseSync = async ()=>{
  try {
    await   contents.sync({ alter: true , force : false});
    // process.exit(0); // exit code 0 is normal
    } catch (err) {
      // this will show the error
      console.log('There was an error at contents model sync! ', err.message);
    }  
}

dataBaseSync()


module.exports = contents;



