const express = require("express");
const router = express.Router();
const driverAuthController = require("../../Controller/driver/driverauth");

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

router.post("/signup", upload.any(), driverAuthController.postdriver);
router.post("/signin", driverAuthController.driverlogin);
router.get("/getdriver", driverAuthController.getallDriver);
router.get("/getdriver/:id", driverAuthController.getDriverById);
router.put("/updatedriver", upload.any(), driverAuthController.editDriver);
router.put("/updatepassword", driverAuthController.updatepassword);
router.delete("/deletedriver/:id", driverAuthController.removedriver);
router.get("/status/:id", driverAuthController.statuscheck);
router.get("/signout/:id", driverAuthController.getsignout);
router.put("/approved/", driverAuthController.Approverdriver);

module.exports = router;
