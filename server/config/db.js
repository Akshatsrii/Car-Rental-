import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    if (uri) {
      uri = uri.trim().replace(/[\r\n'"]/g, "");
    }
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
    // Don't call process.exit(1) so the HTTP server can still boot up and serve errors cleanly.
  }
};

export default connectDB;
