import mongoose, { isValidObjectId } from "mongoose";
import { PlayList } from "../models/playlist.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name && !description) {
    throw new ApiErrorHandler(403, "Invalid Name and description");
  }
  const createPlay = await PlayList.create({
    name,
    description,
    owner: req.user._id,
  });
  if (!createPlay) {
    throw new ApiErrorHandler(500, "Failed to create playlist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Successfully Created Playlist", createPlay));
});
const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!isValidObjectId(playlistId)) {
    throw new ApiErrorHandler(403, "Invalid id");
  }
  const playlist = await PlayList.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(playlistId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
      },
    },
    {
      $match: {
        "video.isPublished": true,
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
              _id: 1,
              fullName: 1,
              email: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        totalVideo: {
          $size: "$video",
        },
        totalViews: {
          $sum: "$video.view",
        },
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        updatedAt: 1,
        totalVideo: 1,
        totalViews: 1,
        owner: 1,
        video: {
          _id: 1,
          videoFile: 1,
          thumbnail: 1,
          title: 1,
          description: 1,
          duration: 1,
          view: 5000,
          isPublished: true,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    },
  ]);
  if (!playlist) {
    throw new ApiErrorHandler(500, "Failed to fetch playlist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Successfully Fetched Playlists", playlist));
});
const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  if (!playlistId && !videoId) {
    throw new ApiErrorHandler(403, "Invalid video and playlist id");
  }
  const playList = await PlayList.findByIdAndUpdate(
    playlistId,
    {
      $addToSet: {
        video: videoId,
      },
    },
    { new: true }
  );
  if (!playList) {
    throw new ApiErrorHandler(500, "Failed to update video playlist playlist");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Successfully addvideo into playlist", playList)
    );
});
const deletPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId) {
    throw new ApiErrorHandler(403, "Invalid id");
  }
  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiErrorHandler(404, "Playlist not found");
  }

  if (playlist.owner?.toString() !== req.user?._id?.toString()) {
    throw new ApiErrorHandler(400, "only owner can delete the playlist");
  }
  const deletePlaylist = await PlayList.findByIdAndDelete(playlistId);
  if (!deletePlaylist) {
    throw new ApiErrorHandler(500, "Failed to delete Playlist");
  }
  return res.status(200).json(new ApiResponse(200, "Successfully deleted", {}));
});
const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  if (!playlistId) {
    throw new ApiErrorHandler(403, "Invalid playlist id");
  }
  const playlist = await PlayList.findById(playlistId);

  if (!playlist) {
    throw new ApiErrorHandler(404, "Playlist not found");
  }
  if (playlist.owner?.toString() !== req.user?._id?.toString()) {
    throw new ApiErrorHandler(400, "only owner can delete the playlist");
  }
  const update = await PlayList.findByIdAndUpdate(
    playlistId,
    {
      $set: {
        name,
        description,
      },
    },
    { new: true }
  );
  if (!update) {
    throw new ApiErrorHandler(500, "Failed to update Playlist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Successfully deleted", update));
});
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { videoId, playlistId } = req.params;
  if (!videoId && !playlistId) {
    throw new ApiErrorHandler(403, "invalid id");
  }
  const playList = await PlayList.findById(playlistId);
  if (!playList) {
    throw new ApiErrorHandler(404, "Playlist not found");
  }
  if (playList.owner?.toString() !== req.user._id?.toString()) {
    throw new ApiErrorHandler(
      400,
      " owner only can remove video from playlist"
    );
  }
  const removevideo = await PlayList.findByIdAndUpdate(
    playlistId,
    {
      $pull: {
        video: videoId,
      },
    },
    { new: true }
  );
  if (!removevideo) {
    throw new ApiErrorHandler(500, "Failed to removed video from playlist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Successfully removes video from playlist"));
});
const getUserPlaylist = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    throw new ApiErrorHandler(403, "Invalid id");
  }
  const playlist = await PlayList.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
      },
    },
    {
      $addFields: {
        totalVideo: {
          $size: "$video",
        },
        totalViews: {
          $sum: "$video.view",
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        video: 1,
        updatedAt: 1,
      },
    },
  ]);
  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched playlist  successfully", playlist));
});
export {
  createPlaylist,
  getPlaylistById,
  addVideoToPlaylist,
  deletPlaylist,
  updatePlaylist,
  removeVideoFromPlaylist,
  getUserPlaylist,
};
