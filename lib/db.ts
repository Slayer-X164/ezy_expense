import mongoose from "mongoose";
let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log("connection succesful ", conn.connection.host);
  } catch (error: any) {
    console.log("Error while connecting to db ", error.message);
    process.exit(1);
  }
}
