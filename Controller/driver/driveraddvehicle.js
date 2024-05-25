const drivercarModel = require("../../Model/driver/driveraddvehicle");

class driverAddvehicle {
  async postVehicle(req, res) {
    try {
      let {
        driverId,
        vehicaltype,
        brand,
        model,
        fueltype,
        color,
        regno,
        seat,
        insurancedate,
      } = req.body;

      let obj = {
        driverId,
        vehicaltype,
        brand,
        model,
        fueltype,
        color,
        regno,
        seat,
        insurancedate,
      };
      if (req.files.length != 0) {
        let arr = req.files;
        let i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i].fieldname == "vehicalimage") {
            obj["vehicalimage"] = arr[i].filename;
          }
          if (arr[i].fieldname == "insurandoc") {
            obj["insurandoc"] = arr[i].filename;
          }
          if (arr[i].fieldname == "driverlicense") {
            obj["driverlicense"] = arr[i].filename;
          }
          if (arr[i].fieldname == "rcdoc") {
            obj["rcdoc"] = arr[i].filename;
          }
          if (arr[i].fieldname == "emissiondoc") {
            obj["emissiondoc"] = arr[i].filename;
          }
        }
      }
      let addVehicle = await drivercarModel.create(obj);
      return res
        .status(201)
        .json({ message: "new vehicle add successfully !!!", addVehicle });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }

  async getVehicleId(req, res) {
    try {
      let id = req.params.id;
      const data = await drivercarModel.findById(id).populate("driverId");
      if (!data) {
        return res.status(401).json({ message: "Data not found !!!" });
      }
      return res.status(200).json({ success: data });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }

  async getAllvehicle(req, res) {
    try {
      const data = await drivercarModel.find({}).populate("driverId");
      if (!data) {
        return res.status(401).json({ message: "Data not found !!!" });
      }
      return res.status(200).json({ success: data });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }

  async updateVehicle(req, res) {
    try {
      let id = req.params.id;
      let {
        vehicaltype,
        brand,
        model,
        fueltype,
        color,
        regno,
        seat,
        insurancedate,
      } = req.body;

      let updateObj = {};
      if (vehicaltype) {
        updateObj["vehicaltype"] = vehicaltype;
      }
      if (brand) {
        updateObj["brand"] = brand;
      }
      if (model) {
        updateObj["model"] = model;
      }
      if (fueltype) {
        updateObj["fueltype"] = fueltype;
      }
      if (color) {
        updateObj["color"] = color;
      }
      if (regno) {
        updateObj["regno"] = regno;
      }
      if (seat) {
        updateObj["seat"] = seat;
      }
      if (insurancedate) {
        updateObj["insurancedate"] = insurancedate;
      }
      if (req.files.length != 0) {
        let arr = req.files;
        let i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i].fieldname == "vehicalimage") {
            updateObj["vehicalimage"] = arr[i].filename;
          }
          if (arr[i].fieldname == "insurandoc") {
            updateObj["insurandoc"] = arr[i].filename;
          }
          if (arr[i].fieldname == "driverlicense") {
            updateObj["driverlicense"] = arr[i].filename;
          }
          if (arr[i].fieldname == "rcdoc") {
            updateObj["rcdoc"] = arr[i].filename;
          }
          if (arr[i].fieldname == "emissiondoc") {
            updateObj["emissiondoc"] = arr[i].filename;
          }
        }
      }

      let updateVehicle = await drivercarModel.findByIdAndUpdate(
        { _id: id },
        { $set: updateObj },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Data update successfully", updateVehicle });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error !!!" });
    }
  }

  async deleteVehicle(req, res) {
    try {
      let id = req.params.id;
      const removedata = await drivercarModel.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ message: "Data deleted successfully!!!", removedata });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }
}

const addVehicleController = new driverAddvehicle();
module.exports = addVehicleController;
