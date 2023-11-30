import dotenv from "dotenv";
import { connectDataBaseMongoDB } from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDataBaseMongoDB()
  .then((item) => console.log(item))
  .catch((error) => {
    console.error(error);
  });
