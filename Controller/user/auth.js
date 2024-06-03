const { default: axios } = require("axios");
const userModel = require("../../Model/user/auth");
const otpModel = require("../../Model/user/otp");

class Authentication {
  async getAlluser(req, res) {
    try {
      const alluser = await userModel.find({});
      return res.status(200).json({ success: alluser });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteuser(req, res) {
    try {
      let id = req.params.id;
      let User = await userModel.findOneAndDelete({ _id: id });
      return res.json({ success: "Successfully Deleted", User });
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  //   Login with otp==========================
  async loginWithOtp(req, res) {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);
    try {
      const isPhonePresent = await userModel.findOne({
        phoneNumber: phoneNumber,
      });
      if (!isPhonePresent) {
        await userModel.create({
          phoneNumber: phoneNumber,
        });
        // return res.status(400).json({ error: "Phone no is not registered..." });
      }

      let otp = (Math.floor(Math.random() * 1000000) + 1000000)
        .toString()
        .substring(1);

      // Checking that the phone is already present in the DB or not.

      const phoneNoPresent = await otpModel.findOne({
        phoneNumber: phoneNumber,
      });

      const key = "Ae97f7ad9d6c2647071d78b6e94a3c87e";
      const sid = "RDABST";
      const to = phoneNumber;
      const body = `Hi, Your OTP for mobile verification is ${otp} Regards, Team ReadAbstract`;
      axios
        .get(
          "https://api-alerts.kaleyra.com/v4/?api_key=" +
            key +
            "&method=sms&message=" +
            body +
            "&to=" +
            to +
            "&sender=RDABST"
        )
        .then(async (data) => {
          console.log(`statusCode: ${data.status}`);
          console.log(data);
          if (!phoneNoPresent) {
            let newotp = new otpModel({
              phoneNumber,
              otp,
            });
            newotp
              .save()
              .then((data) => {
                return res.status(200).json({
                  success: `OTP sent: ${data.otp}`,
                  details: isPhonePresent,
                });
              })
              .catch((error) => {
                return res.status(400).json({ error: error });
              });
          } else {
            await otpModel.findOneAndUpdate(
              { phoneNumber: phoneNumber },
              { $set: { otp: otp } },
              { new: true }
            );
            return res.status(200).json({
              success: "OTP sent successfully",
              details: isPhonePresent,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ error: error });
        });
    } catch (error) {
      console.log(error);
    }
  }

  // OTP Varification==========================

  async otpVarification(req, res) {
    const { phoneNumber, otp } = req.body;
    try {
      const varify = await otpModel.findOne({
        phoneNumber: phoneNumber,
        otp: otp,
      });
      console.log(varify, phoneNumber, otp);

      if (!varify) {
        return res.status(400).json({ error: "OTP is wrong" });
      }
      const isPhonePresent = await userModel.findOne({
        phoneNumber: phoneNumber,
      });
      if (isPhonePresent.blockstatus == true)
        return res.status(400).json({ error: "User Account is Block" });

      return res
        .status(200)
        .json({ success: "OTP varified...", details: isPhonePresent });
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfile(req, res) {
    try {
      let { userId, name, email, address, profileimage } = req.body;
      let Obj = {};

      if (name) {
        Obj["name"] = name;
      }
      if (email) {
        Obj["email"] = email;
      }
      if (address) {
        Obj["address"] = address;
      }
      if (req.files) {
        let arr = req.files;
        let i;
        for (i = 0; i < arr?.length; i++) {
          if (arr[i].fieldname == "profileimage") {
            Obj["profileimage"] = arr[i].filename;
          }
        }
      }
      let data = await userModel.findByIdAndUpdate(
        userId,
        { $set: Obj },
        { new: true }
      );
      console.log(data);
      if (data) {
        return res.status(200).json({ success: data, msg: "Updated user !!" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error !!" });
    }
  }

  //   User Block & Unblock============================
  async BlockUnblockUser(req, res) {
    const userId = req.params.userId;
    try {
      const user = await userModel.findById({ _id: userId });

      if (user.blockstatus === false) {
        await userModel.findByIdAndUpdate(
          { _id: user._id },
          { $set: { blockstatus: true } },
          { new: true }
        );
        return res.status(200).json({ success: "User Blocked..." });
      } else {
        await userModel.findByIdAndUpdate(
          { _id: user._id },
          { $set: { blockstatus: false } },
          { new: true }
        );
        return res.status(200).json({ success: "User Unblocked..." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async statuscheck(req, res) {
    let userid = req.params.userid;
    try {
      const data = await userModel.findOne({ _id: userid });
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the user",
        });
      } else if (data.status === "online") {
        return res.json({ success: "user online" });
      } else {
        return res.status(403).json({ success: "user offline" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const AuthController = new Authentication();
module.exports = AuthController;
