import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer | null = null;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/intellimeet';

  try {
    // Attempt standard connection with 2 second timeout
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[Database] Successfully connected to MongoDB at ${uri}`);
  } catch (error) {
    console.warn(`[Database] Could not connect to external MongoDB at ${uri}. Bootstrapping embedded MongoDB Memory Server...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'intellimeet',
        }
      });
      const memoryUri = mongoMemoryServer.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[Database] Successfully connected to Embedded MongoDB at ${memoryUri}`);
    } catch (memError) {
      console.error('[Database] Failed to initialize embedded MongoDB:', memError);
      throw memError;
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  if (mongoMemoryServer) {
    await mongoMemoryServer.stop();
  }
};
