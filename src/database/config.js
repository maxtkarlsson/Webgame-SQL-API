const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize("gameDb", "", "", {
  dialect: "sqlite",
  storage: path.join(__dirname, "gameDb.sqlite"),
});

module.exports = { sequelize };
