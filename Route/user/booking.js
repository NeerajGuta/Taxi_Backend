const express = require("express");
const router = express.Router();
const userBookingController = require("../../Controller/user/booking");

router.post("/postbooking", userBookingController.postBooking);
router.get("/getbookingwithuserid/:id", userBookingController.getBokingUserID);
router.delete(
  "/getbookingwithdriverid/:id",
  userBookingController.getBokingdriverID
);
router.get("/getallbooking", userBookingController.getBookingHistory);

module.exports = router;
