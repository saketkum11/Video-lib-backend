import { asyncHandler } from "../utils/asyncHandler.js";
import { upload } from "../middleware/multer.middleware.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { Video } from "./../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const getVideo = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
});
const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title && !description) {
    throw new ApiErrorHandler(401, "title and description does not exit ");
  }
  const videoFile = req.files?.videoFile[0]?.path;
  if (!videoFile) {
    throw new ApiErrorHandler(450, "video file does not exits");
  }
  const uploadVideoToCloudinary = await uploadOnCloudinary(videoFile);
  if (!uploadVideoToCloudinary) {
    throw new ApiErrorHandler(450, "video not uploaded to cloudinary");
  }
  const thumbnail = req.files?.thumbnail[0]?.path;
  if (!thumbnail) {
    throw new ApiErrorHandler(450, " thumbnail file does not exits ");
  }

  const uploadThumbnailToCloudinary = await uploadOnCloudinary(thumbnail);
  if (!uploadThumbnailToCloudinary) {
    throw new ApiErrorHandler(450, "thumbnail not uploaded to cloudinary");
  }
  const videoDuration = await uploadVideoToCloudinary.duration;
  const createVideo = await Video.create({
    title,
    description,
    thumbnail: uploadThumbnailToCloudinary.url,
    videoFile: uploadVideoToCloudinary.url,
    duration: videoDuration,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, "Successfully Created Video", createVideo));
});
const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiErrorHandler(401, "VideoId is invalid");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiErrorHandler(400, "Video Does not exit");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "Video fetch Successfully", video));
});

export { getVideo, uploadVideo, getVideoById };
