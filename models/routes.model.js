const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Districts = require("./districts.model");

const Routes = sequelize.define(
  "routes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    distance: {
      type: DataTypes.STRING(30),
    },
    estimated_time: {
      type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Routes.belongsTo(Districts, {foreignKey: "from_district_id"});
Routes.belongsTo(Districts, {foreignKey: "to_district_id"});

Districts.hasMany(Routes, {foreignKey: "from_district_id"});
Districts.hasMany(Routes, {foreignKey: "to_district_id"});

module.exports = Routes;