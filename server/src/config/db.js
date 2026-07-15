import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

export async function connectDB() {
  const opts = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  try {
    await mongoose.connect(env.mongodbUri, opts);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
  });
}
