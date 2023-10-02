const express = require("express");
const router = express.Router();
const userController=require("../controllers/userController")
router.get("/",userController.getAllUser)
router.post("/signup",userController.signUp)
router.post("/login",userController.login)
module.exports = router;