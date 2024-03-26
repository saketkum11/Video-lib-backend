import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/comment.controller.js";

const routers = Router();
routers.use(verifyJWT);
routers.route("/:videoId").get(getComment).post(addComment);
routers.route("/:commentId").delete(deleteComment).patch(updateComment);
export default routers;
