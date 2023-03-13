const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../util/db");

class Admin_auth extends Model {
  static associate(models) {}
}

Admin_auth.init(
  {
    uid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Admin_auth",
    tableName: "Admin_auth",
  }
);

/**
 * Sequelize sync creates table schema in the database
 * You can either choose to run Migrations manually or use automatic sync
 * Using both will cause an error
 */
 let dataBaseSync  =async ()=>{
  try {
    await Admin_auth.sync({ alter: true , force : false});
    // process.exit(0); // exit code 0 is normal
    } catch (err) {
      // this will show the error
      console.log('There was an error at Admin_auth model sync! ', err.message);
    }
  
}

dataBaseSync();

module.exports = Admin_auth;
