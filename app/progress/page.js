'use client';

import { useState } from 'react';
import Link from 'next/link';
import { USER, COURSES } from '@/lib/mockData';

export default function AcademicProgress() {
  const [activeTab, setActiveTab] = useState('Overview');

  const flaggedList = [
    {
      course: 'PCH 301',
      topic: 'Sulbactam Suicide Inactivation Kinetics',
      date: 'Flagged during Mock 03',
      action: 'Review SAR'
    },
    {
      course: 'PHA 303',
      topic: 'Pheochromocytoma Alpha-1 vs Beta Selectivity',
      date: 'Flagged during Practice SBA',
      action: 'Open Mnemonic'
    },
    {
      course: 'PHS 305',
      topic: 'Tubuloglomerular Macula Densa Feedback Loop',
      date: 'Flagged in Renal Unit',
      action: 'Watch Animation'
    }
  ];

  return (
    <div className="flex flex-col w-full pb-10 space-y-4 px-gutter-mobile pt-3">
      {/* Header */}
      <div>
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
          Analytics &amp; Retention
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-serif">
          Academic Progress Report
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          Benchmark Index • UNILAG College of Medicine Baseline
        </p>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container shadow-sm flex flex-col items-center text-center">
          <span className="text-3xl font-bold text-primary font-serif">84%</span>
          <span className="text-xs font-semibold text-on-surface mt-1">Topic Mastery</span>
          <span className="text-[10px] text-primary-container font-semibold mt-0.5">+4% this week</span>
        </div>
        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container shadow-sm flex flex-col items-center text-center">
          <span className="text-3xl font-bold text-primary font-serif">24/28</span>
          <span className="text-xs font-semibold text-on-surface mt-1">Modules Done</span>
          <span className="text-[10px] text-on-surface-variant mt-0.5">4 to finals</span>
        </div>
        <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-container shadow-sm flex flex-col items-center text-center">
          <span className="text-3xl font-bold text-secondary font-serif">3</span>
          <span className="text-xs font-semibold text-on-surface mt-1">Flagged Items</span>
          <span className="text-[10px] text-secondary font-semibold mt-0.5">Action required</span>
        </div>
      </div>

      {/* Visual Mastery Graph Simulation */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-primary font-semibold text-sm">Subject Mastery Curve</h3>
          <span className="text-xs text-on-surface-variant">Target: 80%+</span>
        </div>

        <div className="space-y-3 pt-2">
          {COURSES.map((c) => (
            <div key={c.id} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-primary">{c.code} — {c.shortTitle}</span>
                <span className="font-bold text-primary">{c.progress}%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-primary-container rounded-full transition-all duration-500"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flagged Topics Requiring Intervention */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">warning</span>
            <h3 className="font-title-md text-primary font-semibold text-sm">Flagged Concept Interventions</h3>
          </div>
          <span className="text-xs font-semibold text-secondary">3 Topics</span>
        </div>

        <div className="space-y-2">
          {flaggedList.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-surface-container-low border border-surface-container flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-surface-container text-primary">
                  {item.course}
                </span>
                <p className="font-title-md text-xs text-on-surface font-semibold truncate mt-1">
                  {item.topic}
                </p>
                <span className="text-[10px] text-on-surface-variant">{item.date}</span>
              </div>
              <Link
                href="/ai-tutor"
                className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-xs font-semibold shrink-0 hover:bg-on-secondary-container transition-colors"
              >
                {item.action}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Past Questions Readiness Index */}
      <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container space-y-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary-container">verified</span>
          <h3 className="font-title-md text-primary font-semibold text-sm">PCN Licensing Readiness</h3>
        </div>
        <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
          Based on 240 questions solved across UNILAG, UI, and OAU past examination banks, your projected 1st class probability stands at <strong>88.4%</strong>.
        </p>
        <div className="pt-2">
          <Link
            href="/exam"
            className="w-full bg-primary-container hover:bg-primary text-on-primary py-2.5 rounded-lg text-center font-label-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">timer</span>
            <span>Launch 40-Question Practice Mock</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
