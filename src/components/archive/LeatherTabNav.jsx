import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HandwrittenText } from './HandwrittenText';

const AVATAR_COLORS = {
  ink: 'bg-ink-400', plum: 'bg-plum-400', herb: 'bg-herb-400',
  clay: 'bg-clay-400', brass: 'bg-brass-400', paper: 'bg-paper-300',
};

export function LeatherTabNav() {
  const { user, logout } = useAuth();

  return (
    <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40" role="navigation" aria-label="Archive navigation">
      <div className="desk-surface w-full border-b border-earth-300 dark:border-ink-700">
        <div className="max-w-5xl mx-auto px-6 flex items-end h-14 gap-1">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-2 px-5 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 bg-leather-400/10 dark:bg-leather-700/20 border border-b-0 border-earth-300 dark:border-ink-700 text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200 hover:bg-leather-400/20 dark:hover:bg-leather-700/30 focus-ring"
            style={{ marginBottom: '-1px' }}
          >
            {({ isActive }) => (
              <>
                <span className={`text-base ${isActive ? 'text-brass-400' : 'text-ink-300'}`}>◈</span>
                <span className={`handwriting text-lg ${isActive ? 'text-ink-800 dark:text-ink-100' : ''}`}>Journal</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-brass-400 ml-1" />}
              </>
            )}
          </NavLink>
          <NavLink
            to="/analytics"
            className="flex items-center gap-2 px-5 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 bg-leather-400/10 dark:bg-leather-700/20 border border-b-0 border-earth-300 dark:border-ink-700 text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200 hover:bg-leather-400/20 dark:hover:bg-leather-700/30 focus-ring"
            style={{ marginBottom: '-1px' }}
          >
            {({ isActive }) => (
              <>
                <span className={`text-base ${isActive ? 'text-brass-400' : 'text-ink-300'}`}>◇</span>
                <span className={`handwriting text-lg ${isActive ? 'text-ink-800 dark:text-ink-100' : ''}`}>Archive</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-brass-400 ml-1" />}
              </>
            )}
          </NavLink>
          <NavLink
            to="/reflection"
            className="flex items-center gap-2 px-5 py-2 rounded-t-lg text-sm font-medium transition-all duration-200 bg-leather-400/10 dark:bg-leather-700/20 border border-b-0 border-earth-300 dark:border-ink-700 text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-ink-200 hover:bg-leather-400/20 dark:hover:bg-leather-700/30 focus-ring"
            style={{ marginBottom: '-1px' }}
          >
            {({ isActive }) => (
              <>
                <span className={`text-base ${isActive ? 'text-brass-400' : 'text-ink-300'}`}>✦</span>
                <span className={`handwriting text-lg ${isActive ? 'text-ink-800 dark:text-ink-100' : ''}`}>Desk</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-brass-400 ml-1" />}
              </>
            )}
          </NavLink>
          <div className="flex-1" />

          {user && (
            <div className="flex items-center gap-3 pb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full ${AVATAR_COLORS[user.avatar] || 'bg-ink-400'} flex items-center justify-center`}>
                  <span className="text-[10px] text-white font-medium">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <HandwrittenText size="sm" color="ink-400" className="max-w-[80px] truncate">
                  {user.name}
                </HandwrittenText>
              </div>
              <button
                onClick={logout}
                className="handwriting text-sm text-ink-400 hover:text-clay-500 transition-colors duration-150 focus-ring px-2 py-0.5 rounded"
                aria-label="Sign out"
              >
                Leave
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
