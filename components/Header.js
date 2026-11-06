'use client';

import { useState } from 'react';
import Link from 'next/link';
import { USER } from '@/lib/mockData';

export default function Header({ pageTitle = 'Home Dashboard' }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unread, setUnread] = useState(true);

  const notifications = [
    { id: 1, title: 'PHA 303 Mock Test in 2 days', time: '10m ago', urgent: true },
    { id: 2, title: 'PCH 301 SAR notes updated', time: '1h ago', urgent: false },
    { id: 3, title: 'AI Tutor generated 3 new MCQs', time: 'Yesterday', urgent: false }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-2xl mx-auto h-16 px-gutter-mobile flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          <Link href="/" className="shrink-0 flex items-center">
            {/* Logo mark */}
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-fixed font-serif font-bold text-lg shadow-sm">
              K
            </div>
          </Link>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <Link href="/" className="font-title-md text-title-md text-primary truncate leading-tight hover:underline">
                KOWE AI
              </Link>
              <span className="hidden xs:inline-block font-label-sm text-label-sm text-on-surface-variant font-medium">•</span>
              <span className="hidden xs:inline-block font-label-sm text-label-sm text-on-surface-variant truncate">
                {pageTitle}
              </span>
            </div>
            <div className="inline-flex items-center gap-1 bg-surface-container-low px-1.5 py-0.5 rounded text-on-primary-fixed-variant self-start mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container shrink-0"></span>
              <span className="font-label-sm text-label-sm tracking-tight truncate max-w-[130px] sm:max-w-[180px]">
                {USER.school} • {USER.program}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs shrink-0 relative">
          <button
            aria-label="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setUnread(false);
            }}
            className="relative w-11 h-11 flex items-center justify-center rounded text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unread && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-72 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container mb-2">
                <span className="font-title-md text-primary text-[14px]">Notifications</span>
                <span className="font-label-sm text-secondary font-semibold">Live Feed</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                    <p className="font-body-sm text-[12px] text-on-surface leading-tight font-medium">{n.title}</p>
                    <span className="font-label-sm text-[10px] text-on-surface-variant mt-0.5 block">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center pl-1">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container"
              src={USER.avatar}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
