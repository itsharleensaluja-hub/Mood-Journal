import { NavLink } from 'react-router-dom';
import { HiOutlineHome, HiOutlineChartBar, HiOutlineSparkles } from 'react-icons/hi2';
import { ThemeToggle } from '../ui/ThemeToggle';
import { APP_NAME } from '../../data/constants';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: HiOutlineHome },
  { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
  { path: '/reflection', label: 'Reflection', icon: HiOutlineSparkles },
];

export function Navbar() {
  return (
    <nav
      className="hidden md:flex fixed top-0 left-0 right-0 z-40 h-14 nav-glass"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-6">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 text-base font-serif font-semibold text-ink-800 dark:text-ink-100"
          aria-label={`${APP_NAME} Home`}
        >
          <span className="text-plum-500 text-lg leading-none">✦</span>
          <span>{APP_NAME}</span>
        </NavLink>

        <div className="flex items-center gap-6" role="tablist">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              role="tab"
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 py-1 text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-ink-900 dark:text-ink-100'
                    : 'text-ink-400 dark:text-ink-500 hover:text-ink-700 dark:hover:text-ink-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-plum-500 dark:bg-plum-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
