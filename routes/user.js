const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
//==========================================

router.get("/details", controller.getuserDetailByJWT);

module.exports = router;