const express = require("express");
const router = express.Router();
const upload=require("../utils/multer")
const productController=require("../controllers/productController")
//const {auth}=require("../middlewares/auth")
router.get("/",productController.allProducts)
router.get("/:id",productController.getProduct)
router.post("/",upload.array("image"),productController.addProduct)
router.patch("/:id",upload.array("image"),productController.editProduct)
router.delete("/:id",productController.deleteProduct)
module.exports = router;