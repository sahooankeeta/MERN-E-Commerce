const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,path.join(__dirname,'../public'))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
  }),
  
});