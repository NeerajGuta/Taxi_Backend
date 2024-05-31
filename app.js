const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Server");
});

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: false }));

//Db Connection
mongoose
  .connect(process.env.DB)
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

// Route;
const Userauth = require("./Route/user/auth");
const Admin = require("./Route/admin/admin");
const rating = require("./Route/user/rating");
const vehicletype = require("./Route/admin/vehicletype");
const localstationrates = require("./Route/admin/localstation");
const outstationrates = require("./Route/admin/outstation");
const userwalletRouter = require("./Route/user/wallets");
const driverauth = require("./Route/driver/driverauth");
const addvehicle = require("./Route/driver/driveraddvehicle");
const driverwallet = require("./Route/driver/driverwallets");
const adminnotification = require("./Route/admin/drivernotification");
const adminnotification1 = require("./Route/admin/usernotification");
// +++++++
app.use("/api/v1/user", Userauth);
app.use("/api/v1/user", rating);
app.use("/api/v1/user", userwalletRouter);
app.use("/api/v1/admin", Admin);
app.use("/api/v1/admin", vehicletype);
app.use("/api/v1/admin", localstationrates);
app.use("/api/v1/admin", outstationrates);
app.use("/api/v1/admin", adminnotification);
app.use("/api/v1/admin", adminnotification1);
app.use("/api/v1/driver", driverauth);
app.use("/api/v1/driver", addvehicle);
app.use("/api/v1/driver", driverwallet);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is runing on port http://localhost:${port}`);
});
