import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefereshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiErrorHandler(400, "userId can be found in Database");
  }
};
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
  console.log(req);
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
    coverImageLocalPath = req.files?.coverImage[0].path;
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
    coverImage: coverImageLocalPath?.url || "",
    username,
    avatar: avatarupload?.url,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiErrorHandler(500, "Something went wrong please try again");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Succesfully Created user"));
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  if (!username && !email) {
    throw new ApiErrorHandler(400, "username or email is required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiErrorHandler(404, "user  doesn't exits");
  }

  if (password !== user.password) {
    throw new ApiErrorHandler(401, "Invalid user credentails");
  }

  const getAccessToken = await generateAccessAndRefreshToken(user._id);
  const { accessToken, refreshToken } = getAccessToken;

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "Successfully LoggedIn"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = { httpOnly: true, secure: true };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

export { registerUser, loginUser, logoutUser };
