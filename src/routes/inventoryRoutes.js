const express = require("express");
const router = express.Router();
const { getAllInventories } = require("../controllers/inventoryControllers");

// GET - /api/v1/inventories
router.get("/", getAllInventories);

module.exports = router;
