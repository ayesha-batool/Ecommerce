import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log("Loaded keys:", Object.keys(process.env).filter(k => k.startsWith("MONGODB")));


const connectDB = async () => {
  try {
    console.log("Loaded envs:", process.env);

    console.log("MONGODB_URI", process.env.MONGODB_URI);
   
    if (!process.env.MONGODB_URI) {
      console.log("MONGODB_URI is not set");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
};

export default connectDB;
