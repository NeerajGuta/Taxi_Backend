const mongoose = require("mongoose");

const usernotificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    // date: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

const usernotificationModel = mongoose.model(
  "usernotification",
  usernotificationSchema
);
module.exports = usernotificationModel;
