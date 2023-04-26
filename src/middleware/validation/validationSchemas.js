const { body } = require("express-validator");

exports.itemSchema = [
  body("name")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 30 })
    .withMessage("You must choose a name!"),
];
