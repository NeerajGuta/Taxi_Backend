const express = require("express");
const router = express.Router();
const Authcontroller = require("../../Controller/user/auth");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "Public/User");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/otp", Authcontroller.loginWithOtp);
router.post("/otpvarification", Authcontroller.otpVarification);
router.put("/updateprofile", upload.any(), Authcontroller.updateProfile);
router.put("/userblock/:userId", Authcontroller.BlockUnblockUser);
router.get("/getalluser", Authcontroller.getAlluser);
router.get("/deleteuser/:id", Authcontroller.deleteuser);

module.exports = router;
