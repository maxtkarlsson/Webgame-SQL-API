const express = require("express");
const router = express.Router();

const itemRoutes = require("./itemRoutes");
const characterRoutes = require("./characterRoutes");

router.use("/items", itemRoutes);
router.use("/characters", characterRoutes);

module.exports = router;
