const drivernotificationModel = require("../../Model/admin/drivernotification");

class drivernotification {
  async postadddrivernotification(req, res) {
    let { text } = req.body;
    try {
      let newdrivernotification = new drivernotificationModel({
        text,
        // date,
      });
      let save = newdrivernotification.save();
      if (save) {
        return res.json({ success: "drivernotification added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getalldrivernotification(req, res) {
    let drivernotification = await drivernotificationModel
      .find({})
      .sort({ _id: -1 });
    if (drivernotification) {
      return res.json({ drivernotification: drivernotification });
    } else {
      return res
        .status(403)
        .json({ error: "not able find drivernotification" });
    }
  }

  async postdeletedrivernotification(req, res) {
    try {
      let id = req.params.id;
      const data = await drivernotificationModel.deleteOne({ _id: id });
      return res.json({ success: "Delete Successfully", data });
    } catch (error) {
      console.log(error);
    }
  }
}

const drivernotificationController = new drivernotification();
module.exports = drivernotificationController;
