import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      res.status(500).json({ success: false, error: { message: 'Database connection failed' } });
      return;
    }
  }

  app(req, res);
}
