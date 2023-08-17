import mongoose from "mongoose";

export const connectToMongoDB = async (url) => {
    return await mongoose.connect(url);
}