const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { selectProps } = require("../utils/helpers");

// GET - /api/v1/items
exports.getAllItems = async (req, res) => {
  const limit = req.query?.limit || 10;
  const offset = req.query?.offset || 0;

  const items = await sequelize.query(
    `SELECT i.name, i.description
    FROM item i
    ORDER BY i.name ASC LIMIT $limit OFFSET $offset`,

    {
      bind: { limit: limit, offset: offset },
      type: QueryTypes.SELECT,
    }
  );

  if (!items) throw new NotFoundError("Cannot find any items");

  return res.json(items);
};
