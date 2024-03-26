import mongoose from "mongoose";
import { DATA_BASE_NAME } from "../constants.js";

const connectDataBaseMongoDB = async () => {
  try {
    const connectionInstances = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DATA_BASE_NAME}`
    );
    console.log(connectionInstances.connection.host);
  } catch (error) {
    console.error(error);
  }
};
export { connectDataBaseMongoDB };
