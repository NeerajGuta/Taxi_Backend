const localstationModel = require("../../Model/admin/localstation");
// const { uploadFile } = require("../../Cloudinary/storage");

class localStationrate {
  async addlocalstationrate(req, res) {
    try {
      const {
        vehicleType,
        perkmfare,
        perhrfare,
        onewaydriverallowance,
        onewaynightwayallowance,
        totalseat,
        bookingfee,
        gst,
        cancellationcharge,
        servicecharge,
      } = req.body;

      const file = req.files[0]?.filename;

      // Upload the file to Cloudinary and obtain the URL
      // const cloudinaryResult = await uploadFile(file);
      // const vehicleImage = cloudinaryResult.secure_url;
      const adddata = await localstationModel.create({
        vehicleType,
        vehicleImage: file,
        perkmfare,
        perhrfare,
        onewaydriverallowance,
        onewaynightwayallowance,
        totalseat,
        bookingfee,
        gst,
        cancellationcharge,
        servicecharge,
      });
      console.log(adddata);
      if (adddata) {
        return res
          .status(200)
          .json({ success: "Data is create successfully !!!" });
      }
      return res.status(400).json({ error: "Data is not found !!!" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }

  async updatelocalstation(req, res) {
    try {
      let {
        userid,
        vehicleType,
        perkmfare,
        perhrfare,
        onewaydriverallowance,
        onewaynightwayallowance,
        totalseat,
        bookingfee,
        gst,
        cancellationcharge,
        servicecharge,
      } = req.body;
      console.log(
        userid,
        vehicleType,
        perkmfare,
        perhrfare,
        onewaydriverallowance,
        onewaynightwayallowance,
        totalseat,
        ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      let updateObj = {};
      if (vehicleType) {
        updateObj["vehicleType"] = vehicleType;
      }
      if (perkmfare) {
        updateObj["perkmfare"] = perkmfare;
      }
      if (perhrfare) {
        updateObj["perhrfare"] = perhrfare;
      }
      if (onewaydriverallowance) {
        updateObj["onewaydriverallowance"] = onewaydriverallowance;
      }
      if (onewaynightwayallowance) {
        updateObj["onewaynightwayallowance"] = onewaynightwayallowance;
      }
      if (totalseat) {
        updateObj["totalseat"] = totalseat;
      }
      if (bookingfee) {
        updateObj["bookingfee"] = bookingfee;
      }
      if (gst) {
        updateObj["gst"] = gst;
      }
      if (cancellationcharge) {
        updateObj["cancellationcharge"] = cancellationcharge;
      }
      if (servicecharge) {
        updateObj["servicecharge"] = servicecharge;
      }
      if (req.files && req.files.length != 0) {
        let arr = req.files;
        let i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i].fieldname == "vehicleImage") {
            updateObj.vehicleImage = arr[i].filename;
          }
        }
      }
      let data = await localstationModel.findByIdAndUpdate(
        userid,
        { $set: updateObj },
        { new: true }
      );
      if (!data) {
        return res.status(401).json({ error: "Data is not found !!!" });
      }
      return res.status(200).json({ message: "Data updated successfully !!!" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }

  async getlocalstationrate(req, res) {
    try {
      let data = await localstationModel.find({});
      if (!data) {
        return res.status(401).json({ message: "Data is not found !!!" });
      }
      return res.status(200).json({ success: data });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }

  async removelocalstationrate(req, res) {
    try {
      let id = req.params.id;
      let removedata = await localstationModel.findOneAndDelete({ _id: id });
      if (!removedata) {
        return res.status(401).json({ error: "Data is not found !!!" });
      }
      return res.status(200).json({ success: removedata, removedata });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }
}

const localrateController = new localStationrate();
module.exports = localrateController;
