const express = require("express");
const router = express.Router();
const userWalletcontroller = require("../../Controller/user/userwallet");

router.post("/addcustomerwallet", userWalletcontroller.postaddcustomerwallet);
router.get(
  "/getcustomerwallet/:id",
  userWalletcontroller.getcustomerwalletamount
);
router.get(
  "/getcustomerwalletdetails/:id",
  userWalletcontroller.getcustomerwalletdetails
);
router.post("/paycustomerwallet", userWalletcontroller.postpaycustomerwallet);
router.get("/allcustomerwallet", userWalletcontroller.getcustomerwalletAll);

module.exports = router;
