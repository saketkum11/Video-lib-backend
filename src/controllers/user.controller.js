import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";
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

  const isPassword = await user.isPasswordCorrect(password);
  if (!isPassword) {
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
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
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
const updateRefreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingToken) {
    throw new ApiErrorHandler(401, "unauthories token");
  }
  const decodedToken = Jwt.verify(
    incomingToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!decodedToken) {
    throw new ApiErrorHandler(401, "refresh token secret unmatched");
  }
  const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(
    decodedToken._id
  );
  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiErrorHandler(401, "refresh token secret unmatched");
  }
  const option = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", newRefreshToken, option)
    .json(
      new ApiResponse(200, { accessToken, newRefreshToken }),
      " accesstoken refresh token are refreshed"
    );
});
const updatePassord = asyncHandler(async (req, res) => {
  const { olderPassword, newPassword } = req.body;
  console.log(olderPassword, newPassword);
  if (!(olderPassword && newPassword)) {
    throw new ApiErrorHandler(409, "Provide Older Passord and new Password");
  }
  const user = await User.findById(req.user?._id);

  const userPassword = await user.isPasswordCorrect(olderPassword);
  if (!userPassword) {
    throw new ApiErrorHandler(409, "invalid old password");
  }
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "SuccessFully Changed Password", user));
});
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(201, "User data", req.user));
});
const updateUserAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName || !email)
    throw new ApiErrorHandler(400, "email and fullname invalid");
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Account detail successFully Updated", updatedUser)
    );
});
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatar = req.file?.path;
  if (!avatar) {
    throw new ApiErrorHandler(400, "Avatar image not found");
  }
  const uploadeToCloud = await uploadOnCloudinary(avatar);
  if (!uploadeToCloud) {
    throw new ApiErrorHandler(400, "Error while uploading");
  }
  const uploadAvatarUrl = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: uploadeToCloud.url,
      },
    },
    { new: false }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, "Uploaded avatar", uploadAvatarUrl));
});
const updateCoverImage = asyncHandler(async (req, res) => {
  const coverImage = req.file?.path;
  if (!coverImage) {
    throw new ApiErrorHandler(400, "coverImage image not found");
  }
  const uploadeToCloud = await uploadOnCloudinary(coverImage);
  if (!uploadeToCloud) {
    throw new ApiErrorHandler(400, "Error while uploading");
  }
  const uploadcoverImageUrl = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: uploadeToCloud.url,
      },
    },
    { new: false }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, "Uploaded avatar", uploadcoverImageUrl));
});
const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) {
    throw new ApiErrorHandler(401, "Username is undefined");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subcriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscriber",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribeTo",
      },
    },
    {
      $addFields: {
        subcribeCount: {
          $size: "$subscriber",
        },
        channel: {
          $size: "$subscribeTo",
        },
        isSubScribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscriber.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        email: 1,
        subscriberCount: 1,
        subscribeTo: 1,
        isSubScribed: 1,
        avatar: 1,
        coverImage: 1,
      },
    },
  ]);
  if (!channel.length) {
    throw new ApiErrorHandler(404, "Channel doesn't Exists");
  }
  res
    .status(201)
    .json(
      new ApiResponse(200, "User Channel Fetched Successfully", channel[0])
    );
});
const getWatchedHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req?.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, "watch History is fetched successfully", user));
});
export {
  registerUser,
  loginUser,
  logoutUser,
  updateRefreshAccessToken,
  updatePassord,
  getCurrentUser,
  updateUserAccountDetails,
  updateUserAvatar,
  updateCoverImage,
  getUserChannelProfile,
  getWatchedHistory,
};
