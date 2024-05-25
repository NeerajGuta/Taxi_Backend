const express = require("express");
const router = express.Router();
const AdminController = require("../../Controller/admin/admin");

router.post("/signup", AdminController.postsignup);
router.post("/signin", AdminController.postsignin);
router.get("/signout/:id", AdminController.getsignout);

module.exports = router;
