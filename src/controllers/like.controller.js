import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  // valid video id

  if (!isValidObjectId(videoId)) {
    throw new ApiErrorHandler(403, "Invalid videoid");
  }
  // find video already exits
  const alreadyLikedExits = await Like.findOne({
    video: videoId,
    likedBy: req.user._id,
  });
  // check video already likedby video
  if (alreadyLikedExits) {
    await Like.findByIdAndDelete(alreadyLikedExits?._id);
    return res.status(200).json(new ApiResponse(200, { isLiked: false }));
  }
  // find video by video id
  const likedVideo = await Video.findById(videoId);

  // now create liked video
  await Like.create({
    video: videoId,
    likedBy: req.user._id,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Added in the list of liked", { isLiked: true })
    );
});
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!isValidObjectId(commentId)) {
    throw new ApiErrorHandler(403, "Invalid Id");
  }
  // check if comment is present in the data base or not
  const alreadyComment = await Like.findOne({
    comment: commentId,
    likedBy: req.user._id,
  });
  // check comment liked by user present or not.
  if (alreadyComment) {
    await Like.findByIdAndDelete(alreadyComment?._id);
    return res.status(200).json(new ApiResponse(200, { isLiked: false }));
  }
  // check if not in the database
  await Like.create({
    comment: commentId,
    likedBy: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Liked comment", { isLiked: true }));
});
const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!isValidObjectId(tweetId)) {
    throw new ApiErrorHandler(403, "Invalid Id");
  }
  // check if tweet is present in the data base or not
  const alreadyLikedTweet = await Like.findOne({
    tweet: tweetId,
    likedBy: req.user._id,
  });
  // check tweet liked by user present or not.
  if (alreadyLikedTweet) {
    await Like.findByIdAndDelete(alreadyLikedTweet?._id);
    return res.status(200).json(new ApiResponse(200, { isLiked: false }));
  }
  // check if not in the database
  await Like.create({
    tweet: tweetId,
    likedBy: req.user._id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Liked tweet", { isLiked: true }));
});

const getLikedVideo = asyncHandler(async (req, res) => {
  const likedVideo = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
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
                    avatar: 1,
                    fullName: 1,
                    email: 1,
                    username: 1,
                  },
                },
              ],
            },
          },
          {
            $unwind: "$owner",
          },
        ],
      },
    },
    {
      $unwind: "$video",
    },
    {
      $project: {
        _id: 1,
        video: {
          _id: 1,
          videoFile: 1,
          thumbnail: 1,
          title: 1,
          description: 1,
          duration: 1,
          view: 1,
          owner: 1,
          isPublished: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, "fetched liked video", likedVideo));
});
export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideo };
