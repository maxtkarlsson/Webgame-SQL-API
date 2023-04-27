const bcrypt = require("bcrypt");
const { sequelize } = require("./config");

const { items } = require("../data/items");
const { characters } = require("../data/characters");
const { inventories } = require("../data/inventories");

const gameDb = async () => {
  try {
    // Remove item table if it exists
    await sequelize.query(`DROP TABLE IF EXISTS inventory;`);
    await sequelize.query(`DROP TABLE IF EXISTS item;`);
    await sequelize.query(`DROP TABLE IF EXISTS character;`);

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

    // Create character table
    await sequelize.query(`
    CREATE TABLE IF NOT EXISTS character (
      character_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
      );`);

    let characterInsertQuery = "INSERT INTO character (name) VALUES ";

    let characterInsertQueryVariables = [];

    characters.forEach((character, index, array) => {
      const variables = [character.name];
      let string = "(";

      for (let i = 1; i < variables.length + 1; i++) {
        string += `$${characterInsertQueryVariables.length + i}`;
        if (i < variables.length) string += ",";
      }
      characterInsertQuery += string + ")";
      if (index < array.length - 1) characterInsertQuery += ",";

      characterInsertQueryVariables = [
        ...characterInsertQueryVariables,
        ...variables,
      ];
    });
    characterInsertQuery += ";";
    await sequelize.query(characterInsertQuery, {
      bind: characterInsertQueryVariables,
    });

    // Create inventory table
    await sequelize.query(`
    CREATE TABLE IF NOT EXISTS inventory (
      quantity INTEGER NOT NULL,
      fk_character_id INTEGER NOT NULL,
      fk_item_id INTEGER NOT NULL,
      FOREIGN KEY(fk_character_id) REFERENCES character(character_id),
      FOREIGN KEY(fk_item_id) REFERENCES item(item_id)
      );`);

    let inventoryInsertQuery =
      "INSERT INTO inventory (quantity, fk_character_id, fk_item_id) VALUES ";

    let inventoryInsertQueryVariables = [];

    inventories.forEach((inventory, index, array) => {
      const variables = [
        inventory.quantity,
        inventory.fk_character_id,
        inventory.fk_item_id,
      ];
      let string = "(";

      for (let i = 1; i < variables.length + 1; i++) {
        string += `$${inventoryInsertQueryVariables.length + i}`;
        if (i < variables.length) string += ",";
      }
      inventoryInsertQuery += string + ")";
      if (index < array.length - 1) inventoryInsertQuery += ",";

      inventoryInsertQueryVariables = [
        ...inventoryInsertQueryVariables,
        ...variables,
      ];
    });
    inventoryInsertQuery += ";";
    await sequelize.query(inventoryInsertQuery, {
      bind: inventoryInsertQueryVariables,
    });

    console.log("Database successfully populated with data...");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

gameDb();
