const {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/errors");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const { selectProps } = require("../utils/helpers");

// GET - /api/v1/characters
exports.getAllCharacters = async (req, res) => {
  const limit = req.query?.limit || 10;
  const offset = req.query?.offset || 0;

  const characters = await sequelize.query(
    `SELECT c.name
      FROM character c
      ORDER BY c.name ASC LIMIT $limit OFFSET $offset`,

    {
      bind: { limit: limit, offset: offset },
      type: QueryTypes.SELECT,
    }
  );

  if (!characters) throw new NotFoundError("Cannot find any characters");

  return res.json(characters);
};
