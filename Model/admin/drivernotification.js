const mongoose = require("mongoose");

const drivernotificationSchema = new mongoose.Schema(
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

const drivernotificationModel = mongoose.model(
  "drivernotification",
  drivernotificationSchema
);
module.exports = drivernotificationModel;
