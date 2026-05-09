const { validationResult } = require("express-validator")
const fs = require("fs")
exports.validationCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
        let error = new Error(" fields Validation Error")
        error.status = 422
    throw error
    }
    else {
        next()
    }

}