'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import BottomNav from './BottomNav';

export default function AppShell({ children }) {
  const pathname = usePathname();

  const getPageTitle = (path) => {
    if (path === '/') return 'Home Dashboard';
    if (path.startsWith('/learning')) return 'My Learning';
    if (path.startsWith('/ai-tutor')) return 'AI Tutor';
    if (path.startsWith('/materials')) return 'Study Materials';
    if (path.startsWith('/practice')) return 'Practice Arena';
    if (path.startsWith('/progress')) return 'Academic Progress';
    if (path.startsWith('/exam/scratchpad')) return 'Exam Scratchpad';
    if (path.startsWith('/exam/sketch')) return 'Sketch Mode';
    if (path.startsWith('/exam')) return 'Timed Exam Mode';
    return 'KOWE AI';
  };

  const isExamFullscreen = pathname.startsWith('/exam');

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header pageTitle={getPageTitle(pathname)} />
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface min-h-screen max-w-2xl mx-auto shadow-sm">
        {children}
      </main>
      {!isExamFullscreen && <BottomNav />}
    </div>
  );
}
