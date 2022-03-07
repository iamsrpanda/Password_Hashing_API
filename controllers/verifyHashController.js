const ValidationHelper = require("../helpers/helper.validation");
const bcrypt = require('bcrypt');

exports.verifyHashFun = (req, res) => {
    console.log("incomingReqBody==>", JSON.stringify(req.body));

    ValidationHelper.processValidation(req, res).then(() => {
        var { password, hash } = req.body

        bcrypt.compare(password, hash).then((verifyHashResp) => {
            // Load hash from your password DB.
            console.log("verifyHashResp==>", JSON.stringify(verifyHashResp));
            if (verifyHashResp == true) {
                console.log("Hash verified successfully");
                res.status(200).json({
                    status: 1,
                    message: "Hash verified successfully",
                    data: verifyHashResp
                })
            } else {
                console.log("Password didn't match with hash");
                res.status(400).json({
                    status: 0,
                    message: "Password didn't match with hash",
                    data: verifyHashResp
                })
            }
        }).catch((error) => {
            console.log("Error while verifying hash", JSON.stringify(error));
            res.status(400).json({
                status: 0,
                message: `Error while verifying hash due to ${error.message}`,
                data: ""
            })
        });

    })
}