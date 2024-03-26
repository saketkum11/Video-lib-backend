import Jwt from "jsonwebtoken";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiErrorHandler(401, "unauthories user");
    }
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      throw new ApiErrorHandler(401, "wrong auth session");
    }
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiErrorHandler(401, "invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiErrorHandler(401, error?.message || "invalid access token");
  }
});
export { verifyJWT };
