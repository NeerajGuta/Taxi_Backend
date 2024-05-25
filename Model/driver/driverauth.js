const mongoose = require("mongoose");

const driverAuthSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
    },
    email: {
      type: String,
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    phoneNumber: {
      type: Number,
      trim: true,
      match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
    },
    password: {
      type: String,
    },
    profileimage: {
      type: String,
    },
    gender: {
      type: String,
    },
    datebirth: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    aadharno: {
      type: Number,
    },
    pancardno: {
      type: String,
    },
    aadharimg: {
      type: String,
    },
    pancardimg: {
      type: String,
    },
    lat: {
      type: String,
    },
    long: {
      type: String,
    },
    status: {
      type: String,
      default: "offline",
      enum: ["offline", "online"],
    },
    blockstatus: {
      type: Boolean,
      default: false,
    },
    profilestatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const driverAuthModel = mongoose.model("Driverauth", driverAuthSchema);
module.exports = driverAuthModel;
