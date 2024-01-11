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
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const routers = Router();
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
routers.route("/logout").post(verifyJWT, logoutUser);
routers.route("/refresh-token").post(updateRefreshAccessToken);
routers.route("/update-password").post(verifyJWT, updatePassord);
routers.route("/current-user").get(verifyJWT, getCurrentUser);
routers.route("/update-detail").post(verifyJWT, updateUserAccountDetails);
routers
  .route("/update-avatar")
  .post(verifyJWT, upload.single("avatar"), updateUserAvatar);
routers
  .route("/update-coverimage")
  .post(verifyJWT, upload.single("coverImage"), updateCoverImage);
export default routers;
