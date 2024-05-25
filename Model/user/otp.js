const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      required: true,
      maxlength: 6,
    },
    phoneNumber: {
      type: Number,
    },
    expire_at: { type: Date, default: Date.now, expires: 300 },
  },
  { timestamps: true }
);

const otpModel = mongoose.model("otp", otpSchema);
module.exports = otpModel;
