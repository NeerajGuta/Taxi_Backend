const userwalletModel = require("../../Model/user/userwallet");

class userWallet {
  async postaddcustomerwallet(req, res) {
    const { userId, amount } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Enter a valid Amount" });
    }

    try {
      // Convert amount to a number to avoid any type issues
      const amountNumber = Number(amount);
      let customer = await userwalletModel.findOne({ userId });

      if (customer) {
        let updatedAmount = customer.amount + amountNumber;

        // Add the new transaction to the history
        customer.transactions.push({
          amount: amountNumber,
          type: "credit",
          balanceAfterTransaction: updatedAmount,
        });

        customer.amount = updatedAmount;

        await customer.save();

        return res.json({ success: "Money added to wallet", wallet: customer });
      } else {
        let newcustomerwallet = new userwalletModel({
          userId,
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

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Enter a valid Amount" });
    }

    try {
      let customer = await userwalletModel.findOne({ userId });
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

  async getcustomerwalletAll(req, res) {
    try {
      let allcustomerwallet = await userwalletModel.find({}).populate("userId");
      if (allcustomerwallet) {
        return res.json({ success: allcustomerwallet });
      } else {
        return res.json({ customerwallet: { amount: 0 } });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const userWalletcontroller = new userWallet();
module.exports = userWalletcontroller;
