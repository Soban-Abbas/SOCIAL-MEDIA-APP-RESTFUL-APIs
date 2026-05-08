
const multer = require("multer");
const upload=require("../util/multer")
exports.uploadSingleFile=(req, res, next)=>{
    const uploadfile = upload.single('image');

    uploadfile(req, res, function (err) {
      if (err) {
          next(err)
        }
        // Everything went fine. 
        next()
    })
}
