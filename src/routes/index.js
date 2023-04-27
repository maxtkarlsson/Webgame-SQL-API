const express = require("express");
const router = express.Router();

const itemRoutes = require("./itemRoutes");
const characterRoutes = require("./characterRoutes");
const inventoryRoutes = require("./inventoryRoutes");

router.use("/items", itemRoutes);
router.use("/characters", characterRoutes);
router.use("/inventories", inventoryRoutes);

module.exports = router;
