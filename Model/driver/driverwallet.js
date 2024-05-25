const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const driverwalletSchema = new mongoose.Schema(
  {
    driverId: {
      type: ObjectId,
      ref: "Driverauth",
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const driverwalletModel = mongoose.model("driverwallet", driverwalletSchema);
module.exports = driverwalletModel;
