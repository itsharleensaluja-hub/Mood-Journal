import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center desk-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brass-300 border-t-brass-400 rounded-full animate-spin" />
          <span className="handwriting text-lg text-ink-500">Opening the archive...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
