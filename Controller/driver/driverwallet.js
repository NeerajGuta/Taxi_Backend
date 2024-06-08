const driverwalletModel = require("../../Model/driver/driverwallet");

class driverWallet {
  async postadddriverwallet(req, res) {
    const { driverId, amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Enter a valid Amount" });
    }

    try {
      // Convert amount to a number to avoid any type issues
      const amountNumber = Number(amount);
      let driver = await driverwalletModel.findOne({ driverId });

      if (driver) {
        let updatedAmount = driver.amount + amountNumber;

        // Add the new transaction to the history
        driver.transactions.push({
          amount: amountNumber,
          type: "credit",
          balanceAfterTransaction: updatedAmount,
        });

        driver.amount = updatedAmount;

        await driver.save();

        return res.json({ success: "Money added to wallet", wallet: driver });
      } else {
        let newcustomerwallet = new driverwalletModel({
          driverId,
          amount: amountNumber,
          transactions: [
            {
              amount: amountNumber,
              type: "credit",
              balanceAfterTransaction: amountNumber,
            },
          ],
        });

        let save = await newcustomerwallet.save();
        if (save) {
          return res.json({
            success: "Money added to wallet",
            wallet: newcustomerwallet,
          });
        } else {
          return res.status(500).json({ error: "Failed to save new wallet" });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "An error occurred" });
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
  async postpaycustomerwallet(req, res) {
    let { driverId, amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Enter a valid Amount" });
    }

    try {
      let customer = await driverwalletModel.findOne({ driverId });
      if (customer) {
        let deductionAmount = parseFloat(amount);

        if (customer.amount < deductionAmount) {
          return res.status(400).json({ error: "Insufficient funds" });
        }

        let updatedAmount = parseFloat(customer.amount) - deductionAmount;

        // Add the new transaction to the history
        customer.transactions.push({
          amount: -deductionAmount, // Negative amount for deduction
          type: "debit",
          balanceAfterTransaction: updatedAmount,
        });

        customer.amount = updatedAmount;

        await customer.save();

        return res.json({
          success: "Wallet transaction success",
          wallet: customer,
        });
      } else {
        return res.status(404).json({ error: "User wallet not found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  async getdriverwalletAll(req, res) {
    try {
      let alldriverwallet = await driverwalletModel
        .find({})
        .populate("driverId");
      if (alldriverwallet) {
        return res.json({ success: alldriverwallet });
      } else {
        return res.json({ alldriverwallet: { amount: 0 } });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const driverWalletcontroller = new driverWallet();
module.exports = driverWalletcontroller;
