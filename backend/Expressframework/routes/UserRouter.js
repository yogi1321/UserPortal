const express = require("express");

const router = express.Router();

const UserRouter = require("../Controller/AdminController");


router.get("/user",UserRouter.getdata)



module.exports = router