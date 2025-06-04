const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Regions = require("./regions.model");

const Districts = sequelize.define(
  "districts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
Districts.hasMany(Regions);
Regions.belongsTo(Districts)

module.exports = Districts;