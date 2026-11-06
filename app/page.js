'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { USER, COURSES, RECOMMENDED_TASKS, MILESTONES, MATERIALS } from '@/lib/mockData';
import { getStorageItem, setStorageItem } from '@/lib/storage';

export default function HomeDashboard() {
  const [courses, setCourses] = useState(COURSES);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const saved = getStorageItem('completed_tasks', []);
    setCompletedTasks(saved);
  }, []);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const markTaskDone = (taskId) => {
    const updated = [...completedTasks, taskId];
    setCompletedTasks(updated);
    setStorageItem('completed_tasks', updated);
    triggerToast('Task completed! Added +15 XP to your rhythm.');
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-5 px-gutter-mobile">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-fixed px-4 py-2 rounded-full shadow-lg font-label-md flex items-center gap-2 animate-bounce text-sm">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}

      {/* Greeting & Academic Temporal State */}
      <section className="flex flex-col pt-3 pb-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
            {USER.semester}
          </span>
          <div className="flex items-center gap-1.5 bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">
            <span className="material-symbols-outlined text-[15px] text-secondary">local_fire_department</span>
            <span className="font-label-sm text-label-sm font-semibold">{USER.rhythmDays}-Day Rhythm</span>
          </div>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-serif">
          Good morning, {USER.name}
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          {USER.dateFormatted} • {USER.school} {USER.faculty}
        </p>
      </section>

      {/* Section 1: Active Focus / Continue Learning */}
      <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col border border-surface-container">
        <div className="bg-primary-container px-4 py-3 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-primary px-2 py-0.5 rounded text-primary-fixed font-label-sm text-label-sm tracking-wide font-semibold">
              PCH 301
            </span>
            <span className="font-label-sm text-label-sm text-on-primary-container tracking-tight">
              Pharmaceutical Chemistry
            </span>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container-highest/20 px-2 py-0.5 rounded text-primary-fixed">
            Lesson 4 of 7
          </span>
        </div>
        <div className="p-4 flex flex-col space-y-3">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary leading-snug font-serif">
              Structure-Activity Relationship (SAR) of Penicillins &amp; Beta-Lactams
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Core mechanisms: C-6 acylamino substitution kinetics, thiazolidine ring strain, and beta-lactamase degradation pathways.
            </p>
          </div>
          {/* Syllabus Progress Step Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-on-surface-variant">
              <span className="font-label-sm text-label-sm">Module Retention Target</span>
              <span className="font-label-sm text-label-sm font-bold text-primary">62% Complete</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden flex">
              <div className="bg-primary-container h-full w-[62%] rounded-full transition-all duration-500"></div>
            </div>
          </div>
          {/* Action Button */}
          <div className="pt-2">
            <Link
              href="/learning"
              className="w-full bg-primary-container hover:bg-primary text-on-primary py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-label-md text-label-md transition-colors shadow-sm active:translate-y-px"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>Resume Study (18 mins remaining)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Actionable Next Tasks */}
      <section className="flex flex-col space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-title-md text-primary font-semibold">Recommended Next</h3>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {RECOMMENDED_TASKS.filter(t => !completedTasks.includes(t.id)).length} critical actions
          </span>
        </div>

        {RECOMMENDED_TASKS.map((task) => {
          const isDone = completedTasks.includes(task.id);
          return (
            <div
              key={task.id}
              className={`bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col space-y-2.5 border border-surface-container transition-all ${
                isDone ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-label-sm text-label-sm bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant font-semibold">
                      {task.courseCode}
                    </span>
                    <span
                      className={`font-label-sm text-label-sm font-semibold ${
                        task.badgeType === 'secondary' ? 'text-secondary' : 'text-primary-container'
                      }`}
                    >
                      {task.type}
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-on-surface text-[14px] leading-snug">
                    {task.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">
                    {task.badgeType === 'secondary' ? 'schedule' : 'help_outline'}
                  </span>{' '}
                  {task.readTime}
                </span>
                <div className="flex items-center gap-2">
                  {!isDone && (
                    <button
                      onClick={() => markTaskDone(task.id)}
                      className="p-1 text-on-surface-variant hover:text-primary transition-colors text-xs flex items-center gap-0.5"
                      title="Mark as done"
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </button>
                  )}
                  <Link
                    href={task.actionLink}
                    className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors ${
                      task.highlight
                        ? 'bg-secondary hover:bg-on-secondary-container text-on-secondary'
                        : 'bg-surface-container-low hover:bg-surface-container text-primary-container'
                    }`}
                  >
                    <span>{task.actionText}</span>
                    <span className="material-symbols-outlined text-[14px]">
                      {task.highlight ? 'bolt' : 'arrow_forward'}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Section 3: Academic Progress & Retention Metrics */}
      <section className="bg-surface-container-low rounded-xl p-4 flex flex-col space-y-3 border border-surface-container/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary-container">analytics</span>
            <h3 className="font-title-md text-title-md text-primary font-semibold">Mastery &amp; Syllabus Index</h3>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Pharmacy 300L</span>
        </div>
        {/* Key Stats Grid */}
        <div className="grid grid-cols-3 gap-2">
          <Link href="/progress" className="bg-surface-container-lowest rounded-lg p-2.5 flex flex-col shadow-xs hover:border-primary border border-transparent transition-all">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">{USER.stats.topicMastery}%</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-0.5">Topic Mastery</span>
          </Link>
          <Link href="/learning" className="bg-surface-container-lowest rounded-lg p-2.5 flex flex-col shadow-xs hover:border-primary border border-transparent transition-all">
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              {USER.stats.modulesCompleted}<span className="text-label-sm font-normal text-on-surface-variant">/{USER.stats.totalModules}</span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-0.5">Modules Done</span>
          </Link>
          <Link href="/progress" className="bg-surface-container-lowest rounded-lg p-2.5 flex flex-col shadow-xs hover:border-primary border border-transparent transition-all">
            <span className="font-headline-sm text-headline-sm text-secondary font-bold">{USER.stats.flaggedTopics}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight mt-0.5">Flagged Topics</span>
          </Link>
        </div>
        {/* Past Question Breakdown Note */}
        <div className="bg-surface-container-lowest rounded-lg p-3 flex items-start gap-2.5 shadow-xs">
          <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">bookmark_added</span>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm font-semibold text-primary">Benchmarked Against UNILAG &amp; UI Past Questions</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Your retrieval speed on 300L pharmacodynamics items is 22% faster than last week&apos;s baseline.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Current Enrolled Courses */}
      <section className="flex flex-col space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-title-md text-primary font-semibold">Enrolled Courses</h3>
          <Link href="/learning" className="font-label-sm text-label-sm text-primary-container font-semibold hover:underline">
            View All ({courses.length})
          </Link>
        </div>
        <div className="flex flex-col space-y-2">
          {courses.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              href="/learning"
              className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col space-y-2 border border-surface-container hover:border-primary transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`${c.badgeColor} font-label-sm text-label-sm font-semibold px-2 py-0.5 rounded`}>
                    {c.code}
                  </span>
                  <span className="font-title-md text-title-md text-primary text-[14px] group-hover:underline">
                    {c.title}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-primary">{c.progress}%</span>
              </div>
              <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="bg-primary-container h-full rounded-full transition-all duration-300"
                  style={{ width: `${c.progress}%` }}
                ></div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] truncate">
                Next topic: <span className="font-semibold text-on-surface">{c.nextTopic}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 5: Upcoming Deadlines & Continuous Assessment */}
      <section className="flex flex-col space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-title-md text-primary font-semibold">Assessment Milestones</h3>
          <span className="font-label-sm text-label-sm text-on-surface-variant">November 2024</span>
        </div>
        <div className="space-y-2">
          {MILESTONES.map((m) => (
            <div
              key={m.id}
              className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between gap-3 border border-surface-container"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`${m.color} flex flex-col items-center justify-center w-11 h-11 rounded-lg shrink-0 font-sans`}>
                  <span className="font-label-sm text-[11px] font-bold uppercase leading-none">{m.day}</span>
                  <span className="font-title-md text-title-md font-bold leading-none mt-0.5">{m.date}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-md text-title-md text-primary text-[14px] truncate">
                    {m.title}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {m.due}
                  </span>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[20px] shrink-0 ${m.type === 'exam' ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {m.icon}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Recently Accessed Materials Archive */}
      <section className="flex flex-col space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-title-md text-title-md text-primary font-semibold">Recently Accessed Materials</h3>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Local Cache Active</span>
        </div>
        {MATERIALS.slice(0, 2).map((mat) => (
          <div
            key={mat.id}
            className="bg-surface-container-lowest rounded-xl p-3 shadow-sm flex items-center justify-between gap-3 border border-surface-container"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container shrink-0">
                <span className="material-symbols-outlined text-[20px]">{mat.icon}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-title-md text-title-md text-primary text-[13px] truncate">
                  {mat.title}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {mat.subtitle}
                </span>
              </div>
            </div>
            <Link
              href="/materials"
              aria-label="Open document"
              className="p-1.5 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                {mat.format === 'Audio' ? 'play_arrow' : 'download_for_offline'}
              </span>
            </Link>
          </div>
        ))}
      </section>

      {/* Editorial Motivational Note */}
      <footer className="pt-2 pb-1">
        <div className="bg-surface-container rounded-lg p-3 text-center border border-surface-container-high">
          <p className="font-headline-sm text-headline-sm text-primary text-[16px] italic font-serif">
            “Thoroughness in the basic sciences builds the foundation of clinical accuracy.”
          </p>
          <span className="font-label-sm text-label-sm text-on-surface-variant block mt-1">
            {USER.department} • {USER.school}
          </span>
        </div>
      </footer>
    </div>
  );
}
