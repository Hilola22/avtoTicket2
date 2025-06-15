const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const routeStop = require("./route_stop.model");
const Routes = require("./routes.model");
const Districts = require("./districts.model");

const subRoutes = sequelize.define(
  "routes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Routes.belongsTo(Districts, {foreignKey: "from_stop_id"});
Routes.belongsTo(Districts, {foreignKey: "to_stop_id"});
subRoutes.belongsTo(routeStop, {foreignKey: "route_id"})

routeStop.hasMany(subRoutes, { foreignKey: "from_stop_id" });
routeStop.hasMany(subRoutes, { foreignKey: "to_stop_id" });
Routes.hasMany(subRoutes, {foreignKey: "route_id"})

module.exports = subRoutes;