const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Driver = sequelize.define(
  "driver",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    phone_number: {
      type: DataTypes.STRING(20),
      validate: {
        is: {
          args: [/^\d{2}-\d{3}-\d{2}-\d{2}$/],
          msg: "Phone number must be in the format '+__XX-XXX-XX-XX'",
        },
      },
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Driver;