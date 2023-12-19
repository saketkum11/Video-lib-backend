import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation not empty field
  // user already exist in database
  // check file or not image  , check for avatar
  // check upload them  to cloudinary , avatar
  // create user object , creat entry in database
  // remove password , refresh token from response send
  // check whether user created or not in database
  // return response
  const { fullName, username, email, password } = req.body;
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiErrorHandler(400, "Provide vaild fields");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiErrorHandler(409, "User Already Exist");
  }

  const avatar = req.files?.avatar[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files?.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage[0];
  }
  if (!avatar) {
    throw new ApiErrorHandler(450, "avatar does exists");
  }
  const avatarupload = await uploadOnCloudinary(avatar);
  if (!avatarupload) {
    throw new ApiErrorHandler(450, "avatar not upload to cloudinary");
  }
  const user = await User.create({
    fullName,
    email,
    password,
    coverImage: coverImageLocalPath || "",
    username,
    avatar: avatarupload?.url,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiErrorHandler(500, "Something went wrong please try again");
  }
  return res.status(200).json({ createdUser });
});
export { registerUser };
