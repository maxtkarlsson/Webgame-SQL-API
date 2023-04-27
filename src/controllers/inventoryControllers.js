const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { selectProps } = require("../utils/helpers");

// GET - /api/v1/inventories
exports.getAllInventories = async (req, res) => {
  const limit = req.query?.limit || 10;
  const offset = req.query?.offset || 0;

  const inventories = await sequelize.query(
    `SELECT i.quantity, i.fk_item_id, i.fk_character_id
    FROM inventory i
    LIMIT $limit OFFSET $offset`,

    {
      bind: { limit: limit, offset: offset },
      type: QueryTypes.SELECT,
    }
  );

  if (!inventories) throw new NotFoundError("Cannot find any inventories");

  return res.json(inventories);
};
