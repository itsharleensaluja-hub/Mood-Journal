import { NavLink } from 'react-router-dom';

const items = [
  { path: '/dashboard', label: 'Journal', icon: '◈' },
  { path: '/analytics', label: 'Archive', icon: '◇' },
  { path: '/wellness', label: 'Wellness', icon: '◎' },
  { path: '/reflection', label: 'Desk', icon: '✦' },
  { path: '/counseling', label: 'Counseling', icon: '⊚' },
];

export function RibbonMobileNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-paper-100/90 dark:bg-ink-900/90 backdrop-blur-xl border-t border-earth-300 dark:border-ink-700"
      role="navigation"
      aria-label="Mobile archive navigation"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-start justify-around h-full px-2 pt-1">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            aria-label={item.label}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 pt-1 px-4 transition-all duration-200 focus-ring ${isActive ? 'text-ink-800 dark:text-ink-100' : 'text-ink-400 dark:text-ink-600'}`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-lg ${isActive ? 'text-brass-400' : ''}`}>{item.icon}</span>
                <span className={`handwriting text-sm ${isActive ? 'text-ink-800 dark:text-ink-100' : 'text-ink-400 dark:text-ink-500'}`}>{item.label}</span>
                {isActive && (
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brass-400 rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
