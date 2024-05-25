const express = require("express");
const router = express.Router();
const drivernotificationController = require("../../Controller/admin/drivernotification");

router.post(
  "/adddrivernotification",
  drivernotificationController.postadddrivernotification
);
router.get(
  "/getalldrivernotification",
  drivernotificationController.getalldrivernotification
);
router.post(
  "/deletedrivernotification/:id",
  drivernotificationController.postdeletedrivernotification
);

module.exports = router;
