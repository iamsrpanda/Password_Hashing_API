const ValidationHelper = require("../helpers/helper.validation");
const bcrypt = require('bcrypt');

exports.generateHashFun = (req, res) => {
    console.log("incomingReqBody==>", JSON.stringify(req.body));

    ValidationHelper.processValidation(req, res).then(() => {
        var { password } = req.body

        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then((hashResp) => {
            // Store hash in your password DB.
            console.log("hashResp==>", JSON.stringify(hashResp));
            console.log("Hash generate successfully");
            
            res.status(200).json({
                status: 1,
                message: "Hash generate successfully",
                data: hashResp
            })
        }).catch((error) => {
            console.log("Error while generating hash", JSON.stringify(error));
            res.status(400).json({
                status: 0,
                message: `Error while generating hash due to ${error.message}`,
                data: ""
            })
        });

    })
}