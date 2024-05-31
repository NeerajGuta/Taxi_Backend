const bcrypt = require("bcrypt");
const adminModel = require("../../Model/admin/admin");

class Adminauth {
  async postsignup(req, res) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(403)
          .json({ message: "All fields must not be empty!!!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await adminModel.create({
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Admin created successfully", admin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async postsignin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      const admin = await adminModel.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      res.status(200).json({ message: "Sign-in successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getsignout(req, res) {
    let user = req.params.id;
    try {
      const data = await adminModel.findOneAndUpdate(
        { _id: user },
        { status: "offline" }
      );
      if (!data) {
        return res.status(403).json({
          error: "Cannot able to find the user",
        });
      } else {
        return res.json({ success: "Sign Out Successfull" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const AdminController = new Adminauth();
module.exports = AdminController;
