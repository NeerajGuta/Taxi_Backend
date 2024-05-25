const driverwalletModel = require("../../Model/driver/driverwallet");

class driverWallet {
  async postadddriverwallet(req, res) {
    let { driverId, id, amount } = req.body;

    if (!amount) {
      return res.status(500).json({ error: "Enter Amount" });
    } else {
      try {
        let driver = await driverwalletModel.findOne({ _id: id });
        if (driver) {
          let updatewallet = await driverwalletModel.findOneAndUpdate(
            { _id: id },
            { amount: parseFloat(driver.amount) + parseFloat(amount) }
          );
          return res.json({ success: "Money added to wallet", updatewallet });
        } else {
          let newdriverwallet = new driverwalletModel({
            driverId,
            amount,
          });

          await newdriverwallet.save();
          return res.json({
            success: "Money added to wallet",
            driverWallet: newdriverwallet,
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error !!!" });
      }
    }
  }

  async getdriverwalletamount(req, res) {
    let id = req.params.id;
    try {
      let driverwallet = await driverwalletModel
        .findOne({ _id: id })
        .populate("driverId");
      if (driverwallet) {
        return res.json({ driverwallet: driverwallet });
      } else {
        return res.json({ driverwallet: { amount: 0 } });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error !!!" });
    }
  }

  async getdriverwalletdetails(req, res) {
    let id = req.params.id;
    try {
      let driverwallet = await driverwalletModel
        .findOne({ _id: id })
        .populate("driverId");
      if (driverwallet) {
        return res.json({ driverwallet: driverwallet });
      } else {
        return res.json({ driverwallet: { amount: 0 } });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error !!!" });
    }
  }
  async postpaydriverwallet(req, res) {
    let { driverId, amount } = req.body;
    if (!amount) {
      return res.status(500).json({ error: "Enter Amount" });
    } else {
      try {
        let driver = await driverwalletModel.findOne({ _id: driverId });
        if (driver) {
          let updatewallet = await driverwalletModel.findOneAndUpdate(
            { _id: driverId },
            { amount: parseFloat(driver.amount) - parseFloat(amount) }
          );
          return res.json({
            success: "wallet transaction success",
            updatewallet,
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error !!!" });
      }
    }
  }
}

const driverWalletcontroller = new driverWallet();
module.exports = driverWalletcontroller;
