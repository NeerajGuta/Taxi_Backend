const userwalletModel = require("../../Model/user/userwallet");

class userWallet {
  async postaddcustomerwallet(req, res) {
    let { userId, amount } = req.body;

    if (!amount) {
      return res.status(500).json({ error: "Enter Amount" });
    } else {
      try {
        let customer = await userwalletModel.findOne({ _id: userId });
        if (customer) {
          let updatewallet = await userwalletModel.findOneAndUpdate(
            { _id: userId },
            { amount: parseFloat(customer.amount) + parseFloat(amount) }
          );
          return res.json({ success: "Money added to wallet", updatewallet });
        } else {
          let newcustomerwallet = new userwalletModel({
            userId,
            amount,
          });

          let save = newcustomerwallet.save();
          if (save) {
            return res.json({ success: "Money added to wallet" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getcustomerwalletamount(req, res) {
    let id = req.params.id;
    try {
      let customerwallet = await userwalletModel.findOne({ _id: id });
      if (customerwallet) {
        return res.json({ customerwallet: customerwallet });
      } else {
        return res.json({ customerwallet: { amount: 0 } });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getcustomerwalletdetails(req, res) {
    let id = req.params.id;
    try {
      let customerwallet = await userwalletModel.findOne({ _id: id });
      if (customerwallet) {
        return res.json({ customerwallet: customerwallet });
      } else {
        return res.json({ customerwallet: { amount: 0 } });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async postpaycustomerwallet(req, res) {
    let { userId, amount } = req.body;

    if (!amount) {
      return res.status(500).json({ error: "Enter Amount" });
    } else {
      try {
        let customer = await userwalletModel.findOne({ _id: userId });
        if (customer) {
          let updatewallet = await userwalletModel.findOneAndUpdate(
            { _id: userId },
            { amount: parseFloat(customer.amount) - parseFloat(amount) }
          );
          return res.json({
            success: "wallet transaction success",
            updatewallet,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const userWalletcontroller = new userWallet();
module.exports = userWalletcontroller;
