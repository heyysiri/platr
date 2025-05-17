import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return mongoose.connection;
    }
    
    await mongoose.connect(MONGODB_URI!);
    return mongoose.connection;
  } catch (error) {
    throw error;
  }
};

export default connectDB; 