const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  uploadFile,
};
