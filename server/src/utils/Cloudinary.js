import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// this is for cloudinary configuration setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// a function  to upload file on cloudinary cloud

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    console.log(filePath);
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log(response);
    fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error(error, "line 26 error");
    return;
  }
};

export { uploadOnCloudinary };
