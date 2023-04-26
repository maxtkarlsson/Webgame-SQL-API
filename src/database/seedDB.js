const bcrypt = require("bcrypt");
const { sequelize } = require("./config");

const { items } = require("../data/items");

const gameDb = async () => {
  try {
    await sequelize.query(`DROP TABLE IF EXISTS item;`);

    // Create item table
    await sequelize.query(`
    CREATE TABLE IF NOT EXISTS item (
      item_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL
      );`);

    let itemInsertQuery = "INSERT INTO item (name, description) VALUES ";

    let itemInsertQueryVariables = [];

    items.forEach((item, index, array) => {
      const variables = [item.name, item.description];
      let string = "(";

      for (let i = 1; i < variables.length + 1; i++) {
        string += `$${itemInsertQueryVariables.length + i}`;
        if (i < variables.length) string += ",";
      }
      itemInsertQuery += string + ")";
      if (index < array.length - 1) itemInsertQuery += ",";

      itemInsertQueryVariables = [...itemInsertQueryVariables, ...variables];
    });
    itemInsertQuery += ";";
    await sequelize.query(itemInsertQuery, {
      bind: itemInsertQueryVariables,
    });

    console.log("Database successfully populated with data...");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

gameDb();
