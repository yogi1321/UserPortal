const express = require("express");

const router = express.Router();

const AdminController = require("../Controller/AdminController")




router.post("/add",AdminController.createrole);
router.get("/view",AdminController.getdata);
router.put("/updatedata/:roleid",AdminController.update);
router.delete("/delete/:roleid",AdminController.deleteitems)


module.exports = router;