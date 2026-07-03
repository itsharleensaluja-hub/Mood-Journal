import { NavLink } from 'react-router-dom';

export function LeatherTabNav() {
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
          <span className="handwriting text-sm text-ink-400 dark:text-ink-500 pb-1 pr-2">MindPulse</span>
        </div>
      </div>
    </nav>
  );
}
