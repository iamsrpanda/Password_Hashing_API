const { validationResult } = require("express-validator");

exports.processValidation = (req, res) => {
    console.log("RequestIp", req.connection.remoteAddress);
    return new Promise((resolve, reject) => {
        try {
            const foreignEntities = req.foreignEntities;
            if (foreignEntities && foreignEntities.length > 0) {
                return res.status(400).json({
                    status: 0,
                    message: `Unprocessable entities passed - ${foreignEntities.join(
                        ","
                    )}`,
                    data: "",
                });
            }

            const errors = validationResult(req);
            // console.log(errors);
            if (!errors.isEmpty()) {
                console.log(JSON.stringify(errors.array()));
                return res.status(422).json({ status: 0, message: `Unprocessable Entity - ${Object.keys(errors.mapped()).join()}`, data: "", errors: errors.array() });
            } else {
                resolve()
            }
        } catch (error) {
            return res.status(422).json({ status: 0, message: error.message, data: "" })
        }
    })

}