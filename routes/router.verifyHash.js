const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const verifyHashController = require("../controllers/verifyHashController");

router.post(
    "/api/v1/verify-hash",
    [
        body("password")
            .notEmpty()
            .withMessage("password Required!"),
        body("hash")
            .notEmpty()
            .withMessage("hash Required!"),
    ],
    verifyHashController.verifyHashFun
);

module.exports = router;