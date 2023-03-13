'use strict'


const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/db");
const events = require("./events-model");
class eventCategories extends Model {
  static associateEvents(models) {
          // define association here
          this.hasMany(models, {
            foreignKey : "categoryId",
            onDelete : "CASCADE",
            onUpdate : "CASCADE"
          })
  }
}

eventCategories.init(
  {
    categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name : {
        type : DataTypes.STRING,
    },
    tags : {
        type : DataTypes.STRING,
    },
    description:{
        type : DataTypes.STRING,
    },
    image:{
        type : DataTypes.STRING,
    },
    priority : {
        type : DataTypes.STRING,
    },
    published : {
        type : DataTypes.BOOLEAN
    },

  },
  {
    sequelize,
    modelName: "eventCategories",
    tableName: "eventCategories",
  }
);

/**
 * Sequelize sync creates table schema in the database
 * You can either choose to run Migrations manually or use automatic sync
 * Using both will cause an error
 */


  let dataBaseSync = async ()=>{
    await eventCategories.sync({ alter: true, force : false }).then(()=>{console.log("Table events had been created !")}).catch((error)=>{
      console.log(`There was an error at eventCategories model sync! : ${error.message}`)
    })  
  }
  dataBaseSync();

eventCategories.associateEvents(events)

module.exports = eventCategories;



