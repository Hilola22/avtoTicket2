const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Routes = require("./routes.model");
const Districts = require("./districts.model");

const routeStop = sequelize.define(
  "route_stop",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stop_order: {
      type: DataTypes.INTEGER,
    },
    arrival_time: {
      type: DataTypes.STRING(50),
    },
    departure_time: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Routes.hasMany(routeStop);
routeStop.belongsTo(Routes);

Districts.hasMany(routeStop);
routeStop.belongsTo(Districts);


module.exports = routeStop;