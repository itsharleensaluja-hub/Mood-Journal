import mongoose from 'mongoose';
import { connectDB } from './src/config/db.js';
import { env } from './src/config/env.js';
import app from './src/app.js';

async function start() {
  await connectDB();

  const server = app.listen(env.port, () => {
    console.log(`Server running on port ${env.port} (${env.nodeEnv})`);
  });

  const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    });
    setTimeout(() => {
      console.error('Forced shutdown after 10s');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
