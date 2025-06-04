const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
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
    },
    email: {
      type: DataTypes.STRING(50),
      validate: {
        isEmail: {
          msg: "Email must be valid",
        },
      },
    },
    hashed_password: {
      type: DataTypes.STRING(200),
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;