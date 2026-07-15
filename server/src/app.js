import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { corsOptions } from './config/cors.js';
import { env } from './config/env.js';
import { apiLimiter } from './middleware/rateLimit.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import authRoutes from './routes/auth.routes.js';
import entriesRoutes from './routes/entries.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import goalsRoutes from './routes/goals.routes.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();

app.use(compression());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(hpp());

if (env.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'MindPulse API is running', environment: env.nodeEnv });
});

app.use('/api/auth', authRoutes);
app.use('/api/entries', entriesRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/ai', aiRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: { message: 'Route not found', code: 'NOT_FOUND' } });
});

app.use(errorHandler);

export default app;
