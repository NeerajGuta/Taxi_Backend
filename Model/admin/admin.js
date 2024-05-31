const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      default: "offline",
      enum: ["offline", "online"],
    },
  },
  { timestamps: true }
);
const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
