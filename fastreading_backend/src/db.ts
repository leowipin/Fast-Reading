import mongoose from 'mongoose'

const mongoURI = 'mongodb://localhost:27017/fast_reading';//modify

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
