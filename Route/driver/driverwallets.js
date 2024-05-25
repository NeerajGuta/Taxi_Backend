const express = require("express");
const router = express.Router();
const driverWalletcontroller = require("../../Controller/driver/driverwallet");

router.post("/adddriverwallet", driverWalletcontroller.postadddriverwallet);
router.get(
  "/getdriverwallet/:id",
  driverWalletcontroller.getdriverwalletamount
);
router.get(
  "/getdriverwalletdetails/:id",
  driverWalletcontroller.getdriverwalletdetails
);
router.post("/paydriverwallet", driverWalletcontroller.postpaydriverwallet);

module.exports = router;
