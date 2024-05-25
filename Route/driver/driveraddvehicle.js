const express = require("express");
const router = express.Router();
const addVehicleController = require("../../Controller/driver/driveraddvehicle");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "Public/Vehicle");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/postvehicle", upload.any(), addVehicleController.postVehicle);
router.get("/getVehicle/:id", addVehicleController.getVehicleId);
router.get("/getallVehicle", addVehicleController.getAllvehicle);
router.put(
  "/updatevehicle/:id",
  upload.any(),
  addVehicleController.updateVehicle
);

module.exports = router;
