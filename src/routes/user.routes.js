import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateRefreshAccessToken,
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
export default routers;
