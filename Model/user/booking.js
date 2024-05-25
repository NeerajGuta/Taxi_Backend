const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userbookingSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "user",
    },
    driverId: {
      type: ObjectId,
      ref: "Driverauth",
    },
    pickuplocation: {
      type: String,
    },
    droplocation: {
      type: String,
    },
    bookedtimedate: {
      type: String,
    },
    totalfare: {
      type: String,
    },
    totalkm: {
      type: String,
    },
    triptype: {
      type: String,
    },
    paymenttype: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    bookingstatus: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "completed", "cancelled"],
    },
  },
  { timestamps: true }
);

const userbookingModel = mongoose.model("userBooking", userbookingSchema);
module.exports = userbookingModel;
