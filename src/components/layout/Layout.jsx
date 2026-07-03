import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { PageShell } from './PageShell';
import { SkipToContent } from '../common/SkipToContent';

export function Layout() {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <MobileNav />

      <main
        id="main-content"
        className="min-h-screen pt-14 pb-16 md:pb-8 px-4 sm:px-6 lg:px-8"
        role="main"
      >
        <div className="max-w-5xl mx-auto">
          <PageShell>
            <Outlet />
          </PageShell>
        </div>
      </main>
    </>
  );
}
