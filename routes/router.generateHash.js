const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const generateHashController = require("../controllers/generateHashController");

router.post(
    "/api/v1/generate-hash",
    [
        body("password")
            .notEmpty()
            .withMessage("password Required!")
    ],
    generateHashController.generateHashFun
);

module.exports = router;