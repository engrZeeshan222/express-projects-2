
'use strict'

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/db");

class events extends Model {
  static associate(models) {
     // define association here
}}

events.init(
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
    timings:{
        type: DataTypes.STRING,
    },
    published:{
        type: DataTypes.INTEGER,  
    },
    address : {
        type : DataTypes.STRING,
    },
    zipcode : {
        type : DataTypes.INTEGER,
    },
    categoryId : {
        type : DataTypes.INTEGER,
    },
    metadata : {
        type : DataTypes.STRING,
    },
    price_usd : {
        type :DataTypes.STRING,
    },
    price_eth : {
        type : DataTypes.STRING,
    },
    reward_token : {
        type : DataTypes.STRING,
    },
    security_token : {
        type : DataTypes.STRING,
    }

  },
  {
    sequelize,
    modelName: "events",
    tableName: "events",
  }
);

/**
 * Sequelize sync creates table schema in the database
 * You can either choose to run Migrations manually or use automatic sync
 * Using both will cause an error
 */
let dataBaseSync  = async ()=>{
    try {
        await  events.sync({ alter: true , force : false });
        // process.exit(0); // exit code 0 is normal
        } catch (err) {
          // this will show the error
          console.log('There was an error at events model sync!  ', err.message);
    }  
}

dataBaseSync();
module.exports = events;



