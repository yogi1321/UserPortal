const express=require("express");
const authMiddleware = require('../middleware/middleware')

const router=express.Router();
const userController = require("../controller/userController") ;   

router.get("/user",authMiddleware,userController.getUsers)
router.post("/add",userController.addUser)
router.delete("/del/:userID",userController.deleteUsers)
router.post("/check",userController.loginUser);
router.get("/user/:userID",authMiddleware,userController.getMyProfile);

module.exports=router;
