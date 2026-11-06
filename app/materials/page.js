'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MATERIALS } from '@/lib/mockData';

export default function StudyMaterials() {
  const [materials, setMaterials] = useState(MATERIALS);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  const filtered = materials.filter((m) => {
    const matchesFilter = filter === 'All' || m.format === filter;
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.course.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-10 space-y-4 px-gutter-mobile pt-3">
      {/* Page Header */}
      <div>
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
          Curated Repository
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-serif">
          Study Materials Archive
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          UNILAG Idi-Araba Digital Medical Library • Offline Cached
        </p>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px]">
          search
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search slides, past questions, recordings..."
          className="w-full bg-surface-container-lowest text-on-surface pl-10 pr-4 py-2.5 rounded-xl border border-surface-container text-sm focus:outline-none focus:border-primary shadow-inner"
        />
      </div>

      {/* Format Filter Tabs */}
      <div className="flex gap-2">
        {['All', 'PDF', 'Audio', 'Chart'].map((fmt) => (
          <button
            key={fmt}
            onClick={() => setFilter(fmt)}
            className={`px-3 py-1.5 rounded-full font-label-md text-xs transition-colors ${
              filter === fmt
                ? 'bg-primary-container text-on-primary font-semibold'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModal(item)}
            className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border border-surface-container flex items-center justify-between gap-3 cursor-pointer hover:border-primary transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container shrink-0 group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="bg-surface-container px-1.5 py-0.5 rounded text-[10px] font-bold text-on-surface">
                    {item.course}
                  </span>
                  <span className="font-label-sm text-[11px] text-secondary font-semibold">
                    {item.format}
                  </span>
                </div>
                <h3 className="font-title-md text-primary text-[14px] truncate leading-tight group-hover:underline">
                  {item.title}
                </h3>
                <span className="font-body-sm text-[12px] text-on-surface-variant truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-on-surface-variant font-mono">{item.size}</span>
              <span className="material-symbols-outlined text-primary-container text-[20px]">
                {item.cached ? 'cloud_done' : 'download'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-5 shadow-2xl border border-surface-container space-y-4 animate-in zoom-in-95 max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between pb-2 border-b border-surface-container">
              <div>
                <span className="text-xs text-secondary font-semibold">{activeModal.course} • {activeModal.format}</span>
                <h2 className="font-title-md text-primary font-bold text-base leading-snug">
                  {activeModal.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-surface-container-low p-4 rounded-xl text-sm leading-relaxed text-on-surface font-sans whitespace-pre-line border border-surface-container/60">
              {activeModal.content}
            </div>

            <div className="flex gap-2 pt-2 border-t border-surface-container">
              <Link
                href="/ai-tutor"
                className="flex-1 bg-surface-container text-primary py-2 rounded-lg text-center font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors"
              >
                Discuss with AI Tutor
              </Link>
              <button
                onClick={() => {
                  alert(`Exporting ${activeModal.title} for offline study.`);
                  setActiveModal(null);
                }}
                className="flex-1 bg-primary-container text-on-primary py-2 rounded-lg text-center font-label-md text-xs font-semibold hover:bg-primary transition-colors shadow-xs"
              >
                Download Offline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
