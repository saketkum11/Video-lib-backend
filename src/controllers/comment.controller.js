import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";
import mongoose from "mongoose";
import { validateId } from "../utils/validateID.js";
const getComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiErrorHandler(403, "Invalid videoId");
  }
  const checkVideoId = validateId(videoId);
  if (!checkVideoId) {
    throw new ApiErrorHandler(403, "video id is invalid");
  }
  const commentAggregator = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
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
      $,
    },
    {
      $project: {
        content: 1,
        owner: 1,
      },
    },
  ]);
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "fetched video comment successfully",
        commentAggregator
      )
    );
});
const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;
  if (!videoId && !content) {
    throw new ApiErrorHandler(403, "Invalid VideoId and content");
  }
  const checkId = validateId(videoId);
  if (!checkId) {
    throw new ApiErrorHandler(403, "Invalid VideoID");
  }
  const getVideo = await Video.findById(videoId);
  if (!getVideo) {
    throw new ApiErrorHandler(403, "Video Does not exits");
  }
  const createComment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });
  if (!createComment) {
    throw new ApiErrorHandler(500, "not comment created");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Comment Successfully created", createComment));
});
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    throw new ApiErrorHandler(403, "Invalid commentId");
  }
  const checkCommentId = validateId(commentId);
  if (!checkCommentId) {
    throw new ApiErrorHandler(403, "commentID is invalid id");
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiErrorHandler("comment does  not exits");
  }
  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiErrorHandler(400, "owner  only can delete comment");
  }
  await Comment.findByIdAndDelete(commentId);
  return res
    .status(201)
    .json(new ApiResponse(201, "Successfully deleted comment", {}));
});
const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  if (!commentId && !content) {
    throw new ApiErrorHandler(403, "Invalid commentId");
  }
  const checkCommentId = validateId(commentId);
  if (!checkCommentId) {
    throw new ApiErrorHandler(403, "commentID is invalid id");
  }
  const commentOwner = await Comment.findById(commentId);
  if (commentOwner.owner.toString() !== req.user._id.toString()) {
    throw new ApiErrorHandler(400, "owner  only can update the  comment");
  }
  const comment = await Comment.findByIdAndUpdate(
    commentOwner?._id,
    {
      $set: {
        content: content,
      },
    },
    { new: true }
  );
  return res.status(201).json(new ApiResponse(201, "Update Comment", comment));
});
export { getComment, addComment, deleteComment, updateComment };
