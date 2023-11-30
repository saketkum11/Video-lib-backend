import dotenv from "dotenv";
import { connectDataBaseMongoDB } from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});

connectDataBaseMongoDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server Start ");
    });
  })
  .catch((error) => {
    console.error("Mongo db Connection Failed:", error);
  });
