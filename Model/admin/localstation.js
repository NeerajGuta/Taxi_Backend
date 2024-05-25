const mongoose = require("mongoose");

const LocalSchema = mongoose.Schema(
  {
    vehicleType: {
      type: String,
    },
    vehicleImage: {
      type: String,
    },
    perkmfare: {
      type: Number,
    },
    perhrfare: {
      type: Number,
    },
    onewaydriverallowance: {
      type: Number,
    },
    onewaynightwayallowance: {
      type: Number,
    },
    totalseat: {
      type: Number,
    },
    bookingfee: {
      type: Number,
    },
    gst: {
      type: Number,
    },
    cancellationcharge: {
      type: Number,
    },
    servicecharge: {
      type: Number,
    },
  },
  { timestamps: true }
);

const localstationModel = mongoose.model("localstationrate", LocalSchema);
module.exports = localstationModel;
