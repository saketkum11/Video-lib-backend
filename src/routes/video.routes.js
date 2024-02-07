import { Router } from "express";
import {
  deleteVideo,
  getAllVideo,
  getVideoById,
  togglePublishedStatus,
  updateVideo,
  uploadVideo,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const routers = Router();
routers.use(verifyJWT);

routers
  .route("/")
  .get(getAllVideo)
  .post(
    upload.fields([
      { name: "videoFile", maxCount: 1 },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    uploadVideo
  );
routers
  .route("/:videoId")
  .get(getVideoById)
  .patch(upload.single("thumbnail"), updateVideo)
  .delete(deleteVideo);
routers.route("/toggle/publish/:videoId").patch(togglePublishedStatus);

export default routers;
