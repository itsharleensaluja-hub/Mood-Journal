import { env } from './env.js';

const allowedOrigins = [env.clientUrl];

if (env.isDev) {
  allowedOrigins.push('http://localhost:5173', 'http://localhost:4173');
}

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || env.isDev) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
