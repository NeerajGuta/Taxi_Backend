const driverAuthModel = require("../../Model/driver/driverauth");
const bcrypt = require("bcrypt");

class driverAuthentication {
  async postdriver(req, res) {
    try {
      let {
        name,
        email,
        phoneNumber,
        password,
        gender,
        datebirth,
        address,
        country,
        state,
        city,
        aadharno,
        pancardno,
        lat,
        long,
      } = req.body;

      if (
        !name ||
        !email ||
        !password ||
        !phoneNumber ||
        !gender ||
        !datebirth ||
        !address ||
        !aadharno ||
        !pancardno
      ) {
        return res.status(500).json({ error: "Filed must not be empty" });
      }
      if ((password.length > 255) | (password.length < 8)) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters long" });
      }
      // Check if email already exists
      let existingEmail = await driverAuthModel.findOne({ email: email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
      // Check if phone number already exists
      let existingPhoneNumber = await driverAuthModel.findOne({
        phoneNumber: phoneNumber,
      });
      if (existingPhoneNumber) {
        return res.status(400).json({ error: "Phone number already exists" });
      }
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      let obj = {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        gender,
        datebirth,
        address,
        country,
        state,
        city,
        aadharno,
        pancardno,
        lat,
        long,
      };

      if (req.files.length != 0) {
        let arr = req.files;
        let i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i].fieldname == "profileimage") {
            obj["profileimage"] = arr[i].filename;
          }
          if (arr[i].fieldname == "aadharimg") {
            obj["aadharimg"] = arr[i].filename;
          }
          if (arr[i].fieldname == "pancardimg") {
            obj["pancardimg"] = arr[i].filename;
          }
        }
      }
      const newDriver = await driverAuthModel.create(obj);
      res
        .status(201)
        .json({ message: "Driver registered successfully", newDriver });
    } catch (error) {
      console.error("Error registering driver:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async driverlogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }
      const driver = await driverAuthModel.findOne({ email: email });
      if (!driver) {
        return res.status(401).json({ error: "Invalid email !!" });
      }
      const passwordMatch = await bcrypt.compare(password, driver.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password !!!" });
      }
      return res.status(200).json({ success: "Successfully login" });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async getallDriver(req, res) {
    try {
      const data = await driverAuthModel.find({});
      if (!data) {
        return res.status(401).json({ message: "Data is not found" });
      }
      return res.status(201).json({ success: data });
    } catch (error) {
      return res.status(500).json({ error: "enternal server error !!!" });
    }
  }

  async getDriverById(req, res) {
    try {
      let id = req.params.id;
      const data = await driverAuthModel.find({ _id: id });
      if (!data) {
        return res.status(401).json({ message: "Driver Id not found" });
      }
      return res.status(201).json({ success: data });
    } catch (error) {
      return res.status(500).json({ error: "enternal server error !!!" });
    }
  }
  async editDriver(req, res) {
    try {
      let {
        userId,
        name,
        email,
        phoneNumber,
        gender,
        datebirth,
        address,
        country,
        state,
        city,
        aadharno,
        pancardno,
        lat,
        long,
      } = req.body;

      let updateObj = {};
      if (name) {
        updateObj["name"] = name;
      }
      if (email) {
        updateObj["email"] = email;
      }
      if (phoneNumber) {
        updateObj["phoneNumber"] = phoneNumber;
      }
      if (gender) {
        updateObj["gender"] = gender;
      }

      if (datebirth) {
        updateObj["datebirth"] = datebirth;
      }
      if (address) {
        updateObj["address"] = address;
      }
      if (country) {
        updateObj["country"] = country;
      }
      if (address) {
        updateObj["address"] = address;
      }
      if (state) {
        updateObj["state"] = state;
      }
      if (city) {
        updateObj["city"] = city;
      }
      if (aadharno) {
        updateObj["aadharno"] = aadharno;
      }
      if (pancardno) {
        updateObj["pancardno"] = pancardno;
      }
      if (lat) {
        updateObj["lat"] = lat;
      }
      if (long) {
        updateObj["long"] = long;
      }
      if (req.files.length != 0) {
        let arr = req.files;
        let i;
        for (i = 0; i < arr.length; i++) {
          if (arr[i].fieldname == "profileimage") {
            updateObj["profileimage"] = arr[i].filename;
          }
          if (arr[i].fieldname == "aadharimg") {
            updateObj["aadharimg"] = arr[i].filename;
          }
          if (arr[i].fieldname == "pancardimg") {
            updateObj["pancardimg"] = arr[i].filename;
          }
        }
      }

      let updatedriver = await driverAuthModel.findByIdAndUpdate(
        { _id: userId },
        { $set: updateObj },
        { new: true }
      );
      return res
        .status(201)
        .json({ message: "Data update successfully", updatedriver });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async updatepassword(req, res) {
    try {
      const { email, oldPassword, newPassword } = req.body;
      if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({
          error: "Email, old password, and new password are required",
        });
      }
      const customer = await driverAuthModel.findOne({ email });
      if (!customer) {
        return res.status(401).json({ error: "Driver not found" });
      }
      const passwordMatch = await bcrypt.compare(
        oldPassword,
        customer.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid old password" });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await driverAuthModel.updateOne(
        { email },
        { password: hashedNewPassword }
      );
      return res.status(200).json({ success: "Password updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: "Internal server error" });
    }
  }
  async removedriver(req, res) {
    try {
      let id = req.params.id;
      let dataremove = await driverAuthModel.findOneAndDelete({ _id: id });
      if (!dataremove) {
        return res.status(401).json({ message: "Data is not found !!!" });
      }
      return res.status(201).json({ message: "Data is delete Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error !!!" });
    }
  }
}

const driverAuthController = new driverAuthentication();
module.exports = driverAuthController;
