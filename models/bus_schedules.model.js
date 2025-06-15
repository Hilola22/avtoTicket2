const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Buses = require("./buses.model");

const Schedule = sequelize.define(
  "bus_schedules",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    departure_time: {
      type: DataTypes.STRING(100),
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Schedule.hasMany(Buses)
Buses.belongsTo(Schedule)




module.exports = Schedule;