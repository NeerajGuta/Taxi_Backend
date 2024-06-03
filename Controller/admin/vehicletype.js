const vehicleTypeModel = require("../../Model/admin/vehicletype");

class VehicleTypes {
  async postvehicletype(req, res) {
    try {
      const { vehicletype } = req.body;
      if (!vehicletype) {
        return res.status(400).json({ message: "Vehicle type is required" });
      }
      const vehicleNew = await vehicleTypeModel.create({ vehicletype });
      res
        .status(200)
        .json({ message: "Vehicle type created successfully", vehicleNew });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async putvehicletype(req, res) {
    try {
      let id = req.params.id;
      let { vehicletype } = req.body;
      let Obj = {};

      if (vehicletype) {
        Obj["vehicletype"] = vehicletype;
      }
      let data = await vehicleTypeModel.findByIdAndUpdate(
        id,
        { $set: Obj },
        { new: true }
      );
      if (!data) {
        return res.status(404).json({ message: "Vehicle type not found" });
      }
      return res.status(200).json({ message: "Updated Successfully", data });
    } catch (error) {
      return res.status(201).json({ error: "Internal server error" });
    }
  }

  async getVehicle(req, res) {
    try {
      const getVehicleType = await vehicleTypeModel.find({});
      if (!getVehicleType) {
        return res.status(400).json({ message: "Data not found" });
      }
      return res.status(200).json({ success: getVehicleType });
    } catch (error) {
      return res.status(500).json({ error: "Internal server errror" });
    }
  }

  async removeVehicle(req, res) {
    try {
      let id = req.params.id;
      const removeVehicleType = await vehicleTypeModel.findByIdAndDelete({
        _id: id,
      });
      if (!removeVehicleType) {
        return res.status(400).json({ message: "Data not found" });
      }
      return res.status(200).json({ success: removeVehicleType });
    } catch (error) {
      return res.status(500).json({ error: "Internal server errror" });
    }
  }
}

const VehicleController = new VehicleTypes();
module.exports = VehicleController;
