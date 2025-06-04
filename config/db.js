const config = require("config");
const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  config.get("db_name"),
  config.get("db_username"),
  config.get("db_password"),
  {
    dialect: "postgres",
    host: config.get("db_host"),
    port: config.get("db_port"),
    logging: false,
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
