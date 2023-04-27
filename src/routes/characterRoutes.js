const express = require("express");
const router = express.Router();
const { getAllCharacters } = require("../controllers/characterControllers");

// GET - /api/v1/characters
router.get("/", getAllCharacters);

// GET - /api/v1/items/:itemId
//router.get("/:itemId", getItemById);

module.exports = router;
