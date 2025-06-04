const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Regions = sequelize.define(
  "regions",
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

module.exports = Regions;