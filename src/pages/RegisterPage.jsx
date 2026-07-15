import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HandwrittenText } from '../components/archive/HandwrittenText';
import { AppLogo } from '../components/ui/AppLogo';

export default function RegisterPage() {
  const { register, user, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
    } catch (err) {
      const details = err.response?.data?.error?.details;
      if (details && details.length > 0) {
        setError(details.map(d => d.message).join('. '));
      } else {
        setError(err.response?.data?.error?.message || 'Registration failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen desk-surface flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AppLogo variant="symbol" size="lg" />
          </div>
          <HandwrittenText as="h1" size="xl" className="text-ink-900 dark:text-ink-100 mb-1">
            Begin your archive
          </HandwrittenText>
          <HandwrittenText size="sm" color="ink-500">
            Create your account to start journaling
          </HandwrittenText>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block handwriting text-base text-ink-600 dark:text-ink-400 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              className="w-full px-4 py-2.5 rounded-lg bg-paper-100 dark:bg-ink-800 border border-earth-300 dark:border-ink-700 text-ink-800 dark:text-ink-100 placeholder:text-ink-300 dark:placeholder:text-ink-600 handwriting text-lg focus:outline-none focus:ring-2 focus:ring-brass-400/50 focus:border-brass-400 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block handwriting text-base text-ink-600 dark:text-ink-400 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-paper-100 dark:bg-ink-800 border border-earth-300 dark:border-ink-700 text-ink-800 dark:text-ink-100 placeholder:text-ink-300 dark:placeholder:text-ink-600 handwriting text-lg focus:outline-none focus:ring-2 focus:ring-brass-400/50 focus:border-brass-400 transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block handwriting text-base text-ink-600 dark:text-ink-400 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2.5 rounded-lg bg-paper-100 dark:bg-ink-800 border border-earth-300 dark:border-ink-700 text-ink-800 dark:text-ink-100 placeholder:text-ink-300 dark:placeholder:text-ink-600 handwriting text-lg focus:outline-none focus:ring-2 focus:ring-brass-400/50 focus:border-brass-400 transition-colors"
              placeholder="At least 6 characters"
            />
          </div>

          {error && (
            <p className="text-clay-500 handwriting text-base">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full handwriting text-lg px-5 py-2.5 bg-brass-400/20 hover:bg-brass-400/30 text-ink-700 dark:text-ink-300 rounded-lg transition-all duration-150 border border-brass-400/30 disabled:opacity-40 disabled:cursor-not-allowed focus-ring"
          >
            {submitting ? 'Creating your archive...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center">
          <HandwrittenText size="sm" color="ink-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brass-500 hover:text-brass-400 underline underline-offset-2">
              Sign in
            </Link>
          </HandwrittenText>
        </p>

        <p className="mt-8 text-center">
          <Link to="/" className="handwriting text-sm text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 transition-colors">
            &larr; Back to landing
          </Link>
        </p>
      </div>
    </div>
  );
}
