const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Buses = sequelize.define(
  "buses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number_plate: {
      type: DataTypes.STRING(10),
    },
    seat_count: {
      type: DataTypes.INTEGER,
    },
    model: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Buses;