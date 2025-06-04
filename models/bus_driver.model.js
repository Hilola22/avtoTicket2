const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Driver = require("./drivers.model");
const Buses = require("./buses.model");

const BusDriver = sequelize.define(
  "bus_driver",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
BusDriver.hasMany(Driver);
Driver.belongsTo(BusDriver);

BusDriver.hasMany(Buses);
Buses.belongsTo(BusDriver)

module.exports = BusDriver;