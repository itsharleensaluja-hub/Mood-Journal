import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { PageShell } from './PageShell';
import { SkipToContent } from '../common/SkipToContent';
import { DeskLampGlow } from '../archive/DeskLamp';

export function Layout() {
  return (
    <div className="min-h-screen desk-surface relative">
      <SkipToContent />
      <Navbar />
      <MobileNav />
      <DeskLampGlow className="fixed top-0 right-0 z-0" />

      <main
        id="main-content"
        className="relative z-10 min-h-screen pt-16 pb-16 md:pb-8 px-4 sm:px-6 lg:px-8"
        role="main"
      >
        <div className="max-w-5xl mx-auto">
          <PageShell>
            <Outlet />
          </PageShell>
        </div>
      </main>
    </div>
  );
}
