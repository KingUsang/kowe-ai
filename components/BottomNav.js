'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: 'home', pathPattern: '^/$' },
    { label: 'Learning', href: '/learning', icon: 'menu_book', pathPattern: '^/learning' },
    { label: 'AI Tutor', href: '/ai-tutor', icon: 'psychology', pathPattern: '^/ai-tutor' },
    { label: 'Materials', href: '/materials', icon: 'folder_open', pathPattern: '^/materials' },
    { label: 'Practice', href: '/practice', icon: 'fact_check', pathPattern: '^/practice|^/exam' },
    { label: 'Progress', href: '/progress', icon: 'analytics', pathPattern: '^/progress' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.05)] border-t border-surface-container/60">
      <div className="max-w-2xl mx-auto flex justify-between items-center h-16 px-space-xs">
        {navItems.map((item) => {
          const isActive = new RegExp(item.pathPattern).test(pathname);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors min-w-[52px] ${
                isActive
                  ? "text-primary-container font-semibold"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px] mb-0.5"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400"
                }}
              >
                {item.icon}
              </span>
              <span className="font-label-sm text-[11px] text-center leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
