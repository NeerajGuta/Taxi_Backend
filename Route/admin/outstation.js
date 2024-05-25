const outrateController = require("../../Controller/admin/outstation");
const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "Public/Localstation");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/postoutstationrates",
  upload.any(),
  outrateController.addoutstationrate
);
router.put(
  "/updateoutstationrates",
  upload.any(),
  outrateController.updateoutstation
);
router.get("/getoutstationstationrate", outrateController.getoutstationrate);
router.delete(
  "/deleteoutstationrates/:id",
  outrateController.removeoutstationrate
);

module.exports = router;
