const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema({
  amount: Number,
  type: { type: String, enum: ["credit", "debit"] },
  date: { type: Date, default: Date.now },
  balanceAfterTransaction: Number,
});

const driverwalletSchema = new mongoose.Schema(
  {
    driverId: {
      type: ObjectId,
      ref: "Driverauth",
    },
    amount: { type: Number, default: 0 },
    transactions: [transactionSchema],
  },
  { timestamps: true }
);

const driverwalletModel = mongoose.model("driverwallet", driverwalletSchema);
module.exports = driverwalletModel;
