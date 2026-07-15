import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { JournalProvider } from './context/JournalContext';
import { NotificationProvider } from './context/NotificationContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SkipToContent } from './components/common/SkipToContent';
import { Spinner } from './components/common/Spinner';

const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
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
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <JournalProvider>
            <SkipToContent />
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                      <Route path="/dashboard" element={<HomePage />} />
                      <Route path="/analytics" element={<AnalyticsPage />} />
                      <Route path="/reflection" element={<ReflectionPage />} />
                    </Route>
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </JournalProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
