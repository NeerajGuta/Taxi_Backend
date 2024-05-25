const localrateController = require("../../Controller/admin/localstation");
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
  "/postlocalrates",
  upload.any(),
  localrateController.addlocalstationrate
);
router.put(
  "/updatelocalrates",
  upload.any(),
  localrateController.updatelocalstation
);
router.get("/getlocalstationrate", localrateController.getlocalstationrate);
router.delete(
  "/deletelocalrates/:id",
  localrateController.removelocalstationrate
);

module.exports = router;
