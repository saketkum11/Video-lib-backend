import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  // check whether content is available or not
  if (!content) {
    throw new ApiErrorHandler(403, " please input content value");
  }
  // if content is there then
  const createTweet = await Tweet.create({
    content: content,
    owner: req.user._id,
  });
  // check whether tweet has created or not if no
  if (!createTweet) {
    throw new ApiErrorHandler(400, "Failed to create tweet");
  }
  // if tweet created then you return response
  return res
    .status(200)
    .json(new ApiResponse(200, "tweet successfully created", createTweet));
});
const updateTweet = asyncHandler(async (req, res) => {
  // get the tweetid
  const { tweetId } = req.params;
  const { content } = req.body;
  // check the tweetid
  if (!isValidObjectId(tweetId)) {
    throw new ApiErrorHandler(403, "invalid id");
  }
  const tweet = await Tweet.findById(tweetId);
  // only owner can  update the tweet
  if (!tweet.owner?._id.toString() === req.user._id.toString()) {
    throw new ApiErrorHandler(400, "Only owner can update the tweet");
  }
  // if tweet id valid then check the tweet id present in the databasee
  const newUpdatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content: content,
      },
    },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "Updated tweet successfully", newUpdatedTweet));
});
const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  console.log("from line 62", tweetId);
  // check the tweetid
  if (!isValidObjectId(tweetId)) {
    throw new ApiErrorHandler(403, "invalid id");
  }
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiErrorHandler(404, "not found any such tweet");
  }
  // only owner can  update the tweet
  if (tweet.owner?.toString() !== req.user._id?.toString()) {
    throw new ApiErrorHandler(400, "Only owner can delete the tweet");
  }
  // delete tweet
  const removetweet = await Tweet.findByIdAndDelete(tweetId);
  // check whether tweet get deleted or not
  if (!removetweet) {
    throw new ApiErrorHandler(400, "failed to delete tweet");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, "deleted tweet successfully", {}));
});
const getAllTweet = asyncHandler(async (req, res) => {
  const tweet = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user._id),
      },
    },
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
              email: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "likeDetails",
        pipeline: [
          {
            $project: {
              likedBy: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        content: 1,
        owner: 1,
        createdAt: 1,
        updatedAt: 1,
        likeDetails: 1,
      },
    },
  ]);
  return res.status(200).json(new ApiResponse(200, "Fetch all tweets", tweet));
});
export { createTweet, updateTweet, deleteTweet, getAllTweet };
