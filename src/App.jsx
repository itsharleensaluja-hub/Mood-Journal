import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { JournalProvider } from './context/JournalContext';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Spinner } from './components/common/Spinner';

const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const ReflectionPage = lazy(() => import('./pages/ReflectionPage').then(m => ({ default: m.ReflectionPage })));

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Spinner size="lg" variant="dots" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <JournalProvider>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<HomePage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/reflection" element={<ReflectionPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </JournalProvider>
    </ThemeProvider>
  );
}
