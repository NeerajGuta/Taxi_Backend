const userbookingModel = require("../../Model/user/booking");

class userBooking {
  async postBooking(req, res) {
    try {
      let {
        userId,
        driverId,
        pickuplocation,
        droplocation,
        bookedtimedate,
        totalfare,
        totalkm,
        triptype,
        paymenttype,
        paymentId,
      } = req.body;

      let Obj = {
        userId,
        driverId,
        pickuplocation,
        droplocation,
        bookedtimedate,
        totalfare,
        totalkm,
        triptype,
        paymenttype,
        paymentId,
      };
      let newBooking = await userbookingModel.create(Obj);
      if (!newBooking) {
        return res.status(401).json({ message: "new booking not added" });
      }
      res.status(200).json({ message: "Booking successfully !!!" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getBookingHistory(req, res) {
    try {
      const data = await userbookingModel.find({});
      if (!data) {
        res.status(401).jsno({ error: "Data not found" });
      }
      return res.status(200).json({ message: data });
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  }

  async getBokingUserID(req, res) {
    try {
      let userid = req.params.id;
      const userBookingId = await userbookingModel.findById({ _id: userid });
      if (!userBookingId) {
        return res.status(401).json({ error: "UserId not found" });
      }
      return res.status(200).json({ success: userBookingId });
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  }
  async getBokingdriverID(req, res) {
    try {
      let driverid = req.params.id;
      const userBookingId = await userbookingModel.findById({ _id: driverid });
      if (!userBookingId) {
        return res.status(401).json({ error: "UserId not found" });
      }
      return res.status(200).json({ success: userBookingId });
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  }
}

const userBookingController = new userBooking();
module.exports = userBookingController;
