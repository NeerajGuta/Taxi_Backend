const express = require("express");
const router = express.Router();
const VehicleController = require("../../Controller/admin/vehicletype");

router.post("/createvehicle", VehicleController.postvehicletype);
router.put("/updatevehicle/:id", VehicleController.putvehicletype);
router.get("/getvehicle", VehicleController.getVehicle);
router.delete("/removevehicle/:id", VehicleController.removeVehicle);

module.exports = router;
