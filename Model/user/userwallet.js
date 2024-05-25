const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userwalletSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user",
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const userwalletModel = mongoose.model("userwallets", userwalletSchema);
module.exports = userwalletModel;
