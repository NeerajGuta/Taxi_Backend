const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema(
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
    profileimage: {
      type: String,
    },
    address: {
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
const userModel = mongoose.model("Auth", AuthSchema);
module.exports = userModel;
