import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateRefreshAccessToken,
  updatePassord,
  getCurrentUser,
  updateUserAccountDetails,
  updateUserAvatar,
  updateCoverImage,
  getUserChannelProfile,
  getWatchedHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const routers = Router();
routers.use(verifyJWT);
routers.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
routers.route("/login").post(loginUser);
routers.route("/logout").post(logoutUser);
routers.route("/refresh-token").post(updateRefreshAccessToken);
routers.route("/update-password").post(updatePassord);
routers.route("/current-user").get(getCurrentUser);
routers.route("/update-detail").post(updateUserAccountDetails);
routers.route("/update-avatar").post(upload.single("avatar"), updateUserAvatar);
routers
  .route("/update-coverimage")
  .post(upload.single("coverImage"), updateCoverImage);
routers.route("/get-channel/:username").get(getUserChannelProfile);
routers.route("/watch-history").get(getWatchedHistory);
export default routers;
