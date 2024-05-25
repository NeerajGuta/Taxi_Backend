const mongoose = require("mongoose");

const outStationSchema = mongoose.Schema(
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
    roundtripdriverallowance: {
      type: Number,
    },
    onewaynightwayallowance: {
      type: Number,
    },
    roundtripnightwayallowance: {
      type: Number,
    },
    totalseat: {
      type: Number,
    },
    parkingcharge: {
      type: Number,
    },
    ac: {
      type: String,
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

const outstationModel = mongoose.model("outstationrate", outStationSchema);
module.exports = outstationModel;
