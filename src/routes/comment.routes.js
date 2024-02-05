import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getComment } from "../controllers/comment.controller.js";

const routers = Router();
routers.use(verifyJWT);
routers.route("/comment").get(getComment);
export default routers;
