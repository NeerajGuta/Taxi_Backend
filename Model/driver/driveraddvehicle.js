const mongoose = require("mongoose");

const drivercarSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driverauth",
    },
    vehicaltype: {
      type: String,
    },
    vehicalimage: {
      type: String,
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    fueltype: {
      type: String,
    },
    color: {
      type: String,
    },
    regno: {
      type: String,
    },
    seat: {
      type: Number,
    },
    insurancedate: {
      type: String,
    },
    insurancedoc: {
      type: String,
    },
    driverlicense: {
      type: String,
    },
    rcdoc: {
      type: String,
    },
    emissiondoc: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const drivercarModel = mongoose.model("drivercars", drivercarSchema);
module.exports = drivercarModel;
