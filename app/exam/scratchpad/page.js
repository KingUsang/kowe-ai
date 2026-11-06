'use client';
import Icon from '@/components/Icon';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStorageItem, setStorageItem } from '@/lib/storage';

export default function QuickScratchpad() {
  const [note, setNote] = useState(() =>
    getStorageItem(
      'exam_scratchpad_notes',
      'PCH 301 Clavulanic Acid Mechanism:\n- Lack of C-6 acylamino group\n- Ser-70 attacks β-lactam carbonyl\n- Forms stable acyl-enzyme intermediate\n- Secondary crosslinking inactivates TEM-1 permanently'
    )
  );
  const [savedStatus, setSavedStatus] = useState('All notes saved locally');

  useEffect(() => {
    setStorageItem('exam_scratchpad_notes', note);
    setSavedStatus('Saved');
    const timer = setTimeout(() => setSavedStatus('All notes saved locally'), 2000);
    return () => clearTimeout(timer);
  }, [note]);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] p-4 space-y-3">
      {/* Scratchpad Header */}
      <div className="flex items-center justify-between pb-2 border-b border-surface-container">
        <div className="flex items-center gap-2">
          <Link
            href="/exam"
            className="p-1 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors"
          >
            <Icon name="arrow_back" className="text-[20px]" />
          </Link>
          <div>
            <h1 className="font-title-md text-primary font-semibold">Exam Scratchpad</h1>
            <span className="font-label-sm text-[11px] text-on-surface-variant block">
              {savedStatus}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/exam/sketch"
            className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-xs flex items-center gap-1"
          >
            <Icon name="draw" className="text-[16px]" />
            <span>Switch to Sketch</span>
          </Link>
          <button
            onClick={() => {
              if (confirm('Clear scratchpad content?')) setNote('');
            }}
            className="p-1.5 text-on-surface-variant hover:text-error transition-colors"
            title="Clear notes"
          >
            <Icon name="delete" className="text-[18px]" />
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 flex flex-col bg-surface-container-lowest rounded-xl border border-surface-container p-3 shadow-inner">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jot down formulas, reaction sequences, dose calculations..."
          className="w-full h-full resize-none font-mono text-sm leading-relaxed text-on-surface bg-transparent focus:outline-none"
        />
      </div>

      {/* Quick Formula Inserts */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          't1/2 = 0.693 × Vd / Cl',
          'pH = pKa + log([A-]/[HA])',
          'Loading Dose = Target × Vd',
          'GFR = (U_cr × V) / P_cr'
        ].map((formula) => (
          <button
            key={formula}
            onClick={() => setNote((prev) => `${prev}\n${formula}`)}
            className="px-2.5 py-1 rounded bg-surface-container text-primary font-mono text-[11px] shrink-0 hover:bg-surface-container-high"
          >
            + {formula}
          </button>
        ))}
      </div>
    </div>
  );
}
