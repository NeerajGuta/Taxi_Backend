// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema.Types;

// const userwalletSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: ObjectId,
//       ref: "Auth",
//     },
//     amount: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// const userwalletModel = mongoose.model("userwallets", userwalletSchema);
// module.exports = userwalletModel;
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema({
  amount: Number,
  type: { type: String, enum: ["credit", "debit"] },
  date: { type: Date, default: Date.now },
  balanceAfterTransaction: Number,
});

const userwalletSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "Auth",
  },
  amount: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

const userwalletModel = mongoose.model("UserWallet", userwalletSchema);

module.exports = userwalletModel;
