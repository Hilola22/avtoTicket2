const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(15,2),
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "card")
    },
    status: DataTypes.ENUM("paid", "unpaid", "will pay"),
    paid_at: DataTypes.STRING(50),
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Payment;