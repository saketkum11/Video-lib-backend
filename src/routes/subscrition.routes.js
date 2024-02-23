import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";
import { getUserChannelProfile } from "../controllers/user.controller.js";

const routers = Router();
routers.use(verifyJWT);
routers
  .route("/:channelId")
  .post(toggleSubscription)
  .get(getUserChannelSubscribers);
routers.route("/:subscriberId").get(getSubscribedChannels);

export default routers;
