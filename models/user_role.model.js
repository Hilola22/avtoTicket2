const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const Role = require("./role.model");

const UserRole = sequelize.define(
  "user_role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
  }
);

User.belongsToMany(Role, {through: UserRole,});
Role.belongsToMany(User, { through: UserRole });

UserRole.belongsTo(User);
UserRole.belongsTo(Role);

module.exports = UserRole;
