import mongoose from "mongoose";

const connectDataBaseMongoDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}${DATA_BASE_NAME}`);
  } catch (error) {
    console.error(error);
  }
};
export { connectDataBaseMongoDB };
