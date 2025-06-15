const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");
const Schedule = require("./bus_schedules.model");

const passangerTicket = sequelize.define(
  "passanger_ticket",
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
    passport_number: {
      type: DataTypes.STRING(15),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    seat_number: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("reserved", "cancelled", "purchased"),
    },
    date: DataTypes.DATE,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(passangerTicket);
passangerTicket.belongsTo(User);

Schedule.hasMany(passangerTicket);
passangerTicket.belongsTo(Schedule);

module.exports = passangerTicket;
