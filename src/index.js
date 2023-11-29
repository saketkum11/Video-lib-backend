import dotenv from "dotenv";
import { connectDataBaseMongoDB } from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDataBaseMongoDB()
  .then(console.log("MongoDb Connected!!!!"))
  .catch((error) => {
    console.error(error);
  });
