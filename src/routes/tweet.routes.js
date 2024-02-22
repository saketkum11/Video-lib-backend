import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getAllTweet,
  updateTweet,
} from "../controllers/tweet.controller.js";

const routers = Router();
routers.use(verifyJWT);
routers.route("/tweet").post(createTweet);
routers.route("/:tweetId").patch(updateTweet).delete(deleteTweet);
routers.route("/").get(getAllTweet);

export default routers;
