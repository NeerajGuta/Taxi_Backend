const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driverauth",
    },
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
  },
  { timestamps: true }
);

const ratingModel = mongoose.model("Rating", ratingSchema);
module.exports = ratingModel;
