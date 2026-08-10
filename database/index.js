import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;
let connectionAttempted = false;

const connectDB = async () => {
  if (connectionAttempted) {
    return;
  }

  connectionAttempted = true;

  try {
    let uri = process.env.MONGODB_URI;

    if (!uri || process.env.USE_IN_MEMORY_DB === 'true') {
      mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log("Using in-memory MongoDB server for local/demo deployment");
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    if (process.env.NODE_ENV === 'production' && process.env.USE_IN_MEMORY_DB !== 'true') {
      console.warn('Continuing without a database connection for this deployment.');
      return;
    }
    process.exit(1);
  }
};

// Disconnect and stop in-memory MongoDB server if used
const disconnectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongod) {
      await mongod.stop();
    }
  } catch (error) {
    console.error(`Error disconnecting from MongoDB: ${error.message}`);
  }
};

export { connectDB, disconnectDB };
