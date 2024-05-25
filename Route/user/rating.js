const express = require("express");
const router = express.Router();
const ratingController = require("../../Controller/user/rating");

router.post("/AddReview", ratingController.AddRating);
router.get("/getReview", ratingController.getRating);
router.delete("/userRemoveReview/:id", ratingController.RemoveRating);

module.exports = router;
