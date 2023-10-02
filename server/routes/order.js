const express = require("express");
const router = express.Router();
const orderController=require("../controllers/orderController")
router.post("/payment/create-order", orderController.order);
router.post("/payment/verify-order",orderController.verify);
router.get("/all",orderController.getAllOrders)
router.get("/:id", orderController.getOrder)
module.exports = router;