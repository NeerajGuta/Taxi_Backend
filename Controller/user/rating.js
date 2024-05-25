const ratingModel = require("../../Model/user/rating");

class Rating {
  async AddRating(req, res) {
    let { userId, driverId, rating, review } = req.body;

    try {
      let NewReview = new ratingModel({
        userId,
        rating,
        driverId,
        review,
      });
      NewReview.save().then((data) => {
        return res.status(200).json({ success: "success", NewReview });
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!!" });
    }
  }

  async getRating(req, res) {
    try {
      let Rating = await ratingModel.find({}).populate("userId", "driverId");

      if (Rating) {
        return res.status(200).json({ Rating: Rating });
      } else {
        return res.status(400).json({ error: "something went wrong" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async RemoveRating(req, res) {
    let remove = req.params.id;
    try {
      await ratingModel.findOneAndDelete({ _id: remove });
      return res.json({ Success: "Removed Successfully" });
    } catch (error) {
      console.log(error);
      return res.status({ error: "Internal server error !!!" });
    }
  }
}

const ratingController = new Rating();
module.exports = ratingController;
