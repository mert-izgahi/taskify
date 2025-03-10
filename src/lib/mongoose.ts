import mongoose from "mongoose";
import configs from "../configs";

export const connectDb = async () => {
  try {
    await mongoose.connect(configs.MONGODB_URI || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
