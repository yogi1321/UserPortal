const express = require("express");

const router = express.Router();

const RolesRouter = require("../Controller/RolesController");



router.get("/get",RolesRouter.getroles);
router.post("/addrole",RolesRouter.createroles);
router.put("/update/:roleid",RolesRouter.updateroles);
router.delete("/delete/:roleid",RolesRouter.deleteroles);



module.exports = router;