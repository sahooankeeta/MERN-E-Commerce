const express = require("express");
const router = express.Router();
const cartController=require("../controllers/cartController")
router.get("/",cartController.getCart)
router.post("/add",cartController.addToCart)
router.delete("/remove/:id",cartController.removeFromCart)
router.patch("/update",cartController.updateCartQuantity)
module.exports = router;