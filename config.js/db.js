import mongoose from "mongoose"

const connectDb = async () => {
  try {
    const databaseConnection = await mongoose.connect(process.env.MONGO_URI, {})

    console.log(`MongoDB Connected: ${databaseConnection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb