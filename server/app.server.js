const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");

const app = express();

app.use(cors({ origin: true }));
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error(err);
        return res
            .status(400)
            .json({ status: 0, message: "put a valid request body" }); // Bad request
    }
    // next();
});

const generateHashRouter = require('../routes/router.generateHash');
const verifyHashRouter = require('../routes/router.verifyHash');

app.use('/', generateHashRouter);
app.use('/', verifyHashRouter);



//404 request handeller
app.use((req, res, next) => {
    res.status("404").json({
        status: 0,
        message: "404 No routes found",
    });
});

module.exports = app;