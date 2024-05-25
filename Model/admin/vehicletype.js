const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
  {
    vehicletype: {
      type: String,
    },
  },
  { timestamps: true }
);
const vehicleTypeModel = mongoose.model("vehicleType", vehicleSchema);
module.exports = vehicleTypeModel;
