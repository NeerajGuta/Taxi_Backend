const express = require("express");
const router = express.Router();
const usernotificationController = require("../../Controller/admin/usernotification");

router.post(
  "/addusernotification",
  usernotificationController.postaddusernotification
);
router.get(
  "/getallusernotification",
  usernotificationController.getallusernotification
);
router.post(
  "/deleteusernotification/:id",
  usernotificationController.postdeleteusernotification
);

module.exports = router;
