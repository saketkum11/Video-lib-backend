import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletPlaylist,
  getPlaylistById,
  getUserPlaylist,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/playList.controller.js";

const routers = Router();
routers.use(verifyJWT);
routers
  .route("/:playlistId")
  .get(getPlaylistById)
  .delete(deletPlaylist)
  .patch(updatePlaylist);
routers.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);
routers.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);
routers.route("/user/:userId").get(getUserPlaylist);
export default routers;
