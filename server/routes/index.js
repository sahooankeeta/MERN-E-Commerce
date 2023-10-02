const express = require("express");
const router = express.Router();
const {auth}=require("../middlewares/auth")

router.use("/users", require("./users"));
router.use("/products",auth, require("./products"));
router.use("/orders",auth, require("./order"))
router.use("/cart",auth,require("./cart"))
router.get("/",(req,res)=>{
res.send("welcome")
})

module.exports = router;
