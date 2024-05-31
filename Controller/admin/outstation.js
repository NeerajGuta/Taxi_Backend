const outstationModel = require("../../Model/admin/outstation");
// const { uploadFile } = require("../../Cloudinary/storage");

class outStationrate {
  async addoutstationrate(req, res) {
    try {
      const {
        vehicleType,
        perkmfare,
        perhrfare,
        onewaydriverallowance,
        roundtripdriverallowance,
        onewaynightwayallowance,
        roundtripnightwayallowance,
        ac,
        totalseat,
        bookingfee,
        parkingcharge,
        gst,
        cancellationcharge,
        servicecharge,
        tollcharge,
        city,
      } = req.body;

      const file = req.files[0].filename;

      const adddata = await outstationModel.create({
        vehicleType,
        vehicleImage: file,
        perkmfare,
        perhrfare,
        onewaydriverallowance,
        roundtripdriverallowance,
        onewaynightwayallowance,
        roundtripnightwayallowance,
        ac,
        totalseat,
        parkingcharge,
        bookingfee,
        gst,
        cancellationcharge,
        servicecharge,
        tollcharge,
        city,
      });

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

  async updateoutstation(req, res) {
    try {
      let {
        userid,
        vehicleType,
        perkmfare,
        perhrfare,
        onewaydriverallowance,
        roundtripdriverallowance,
        onewaynightwayallowance,
        roundtripnightwayallowance,
        ac,
        totalseat,
        parkingcharge,
        bookingfee,
        gst,
        cancellationcharge,
        servicecharge,
        tollcharge,
        city,
      } = req.body;

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
        update["onewaydriverallowance"] = onewaydriverallowance;
      }
      if (roundtripdriverallowance) {
        updateObj["roundtripdriverallowance"] = roundtripdriverallowance;
      }
      if (onewaynightwayallowance) {
        updateObj["onewaynightwayallowance"] = onewaynightwayallowance;
      }
      if (roundtripnightwayallowance) {
        updateObj["roundtripnightwayallowance"] = roundtripnightwayallowance;
      }
      if (ac) {
        updateObj["ac"] = ac;
      }
      if (totalseat) {
        updateObj["totalseat"] = totalseat;
      }
      if (parkingcharge) {
        updateObj["parkingcharge"] = parkingcharge;
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
      if (tollcharge) {
        updateObj["tollcharge"] = tollcharge;
      }
      if (city) {
        updateObj["city"] = city;
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
      let data = await outstationModel.findByIdAndUpdate(
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

  async getoutstationrate(req, res) {
    try {
      let data = await outstationModel.find({});
      if (!data) {
        return res.status(401).json({ message: "Data is not found !!!" });
      }
      return res.status(201).json({ success: data });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }

  async removeoutstationrate(req, res) {
    try {
      let id = req.params.id;
      let removedata = await outstationModel.findOneAndDelete({ _id: id });
      if (!removedata) {
        return res.status(401).json({ error: "Data is not found !!!" });
      }
      return res
        .status(200)
        .json({ success: "Data Deleted Successfully", removedata });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }
}

const outrateController = new outStationrate();
module.exports = outrateController;
