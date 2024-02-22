import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getLikedVideo,
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
} from "../controllers/like.controller.js";

const routers = Router();
routers.use(verifyJWT);
routers.route("/toggle/v/:videoId").post(toggleVideoLike);
routers.route("/toggle/c/:commentId").post(toggleCommentLike);
routers.route("/toggle/t/:tweetId").post(toggleTweetLike);
routers.route("/videos").get(getLikedVideo);

export default routers;
