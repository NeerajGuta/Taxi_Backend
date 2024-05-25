const usernotificationModel = require("../../Model/admin/usernotification");

class usernotification {
  async postaddusernotification(req, res) {
    let { text } = req.body;
    try {
      let newusernotification = new usernotificationModel({
        text,
        // date,
      });
      let save = newusernotification.save();
      if (save) {
        return res.json({ success: "usernotification added successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getallusernotification(req, res) {
    let usernotification = await usernotificationModel
      .find({})
      .sort({ _id: -1 });
    if (usernotification) {
      return res.json({ usernotification: usernotification });
    } else {
      return res.status(403).json({ error: "not able find usernotification" });
    }
  }

  async postdeleteusernotification(req, res) {
    try {
      let id = req.params.id;
      const data = await usernotificationModel.deleteOne({ _id: id });
      return res.json({ success: "Delete Successfully", data });
    } catch (error) {
      console.log(error);
    }
  }
}

const usernotificationController = new usernotification();
module.exports = usernotificationController;
