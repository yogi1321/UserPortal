const express = require("express");

const router = express.Router();

const RolesRouter = require("../Controller/RolesController");



router.get("/get",RolesRouter.getroles);
router.post("/addrole",RolesRouter.createroles);



module.exports = router;