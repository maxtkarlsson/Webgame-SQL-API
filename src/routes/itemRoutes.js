const express = require("express");
const router = express.Router();
const { getAllItems } = require("../controllers/itemControllers");

// GET - /api/v1/items
router.get("/", getAllItems);

// GET - /api/v1/items/:itemId
//router.get("/:itemId", getItemById);

module.exports = router;
