import { NavLink } from 'react-router-dom';
import { HiOutlineHome, HiOutlineChartBar, HiOutlineSparkles } from 'react-icons/hi2';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: HiOutlineHome },
  { path: '/analytics', label: 'Analytics', icon: HiOutlineChartBar },
  { path: '/reflection', label: 'Reflect', icon: HiOutlineSparkles },
];

export function MobileNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-earth-50/90 dark:bg-ink-900/90 backdrop-blur-xl border-t border-earth-200 dark:border-ink-700"
      role="navigation"
      aria-label="Mobile navigation"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-full px-2" role="tablist">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            role="tab"
            aria-label={item.label}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors duration-150 ${
                isActive
                  ? 'text-plum-500 dark:text-plum-400'
                  : 'text-ink-400 dark:text-ink-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" aria-hidden="true" />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-plum-500 dark:bg-plum-400 rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
