'use client';
import Icon from '@/components/Icon';

import { useState } from 'react';
import Link from 'next/link';
import { COURSES } from '@/lib/mockData';
import { getStorageItem, setStorageItem } from '@/lib/storage';

export default function MyLearning() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [courses, setCourses] = useState(COURSES);
  const [expandedCourse, setExpandedCourse] = useState('pch-301');
  const [completedLessons, setCompletedLessons] = useState(() =>
    getStorageItem('completed_lessons', { 'pch-301': [1, 2, 3] })
  );

  const filters = ['All', 'PCH', 'PHA', 'PHS', 'CHM'];

  const filteredCourses = selectedFilter === 'All'
    ? courses
    : courses.filter(c => c.code.startsWith(selectedFilter));

  const toggleLesson = (courseId, lessonNum) => {
    const current = completedLessons[courseId] || [];
    const updated = current.includes(lessonNum)
      ? current.filter(n => n !== lessonNum)
      : [...current, lessonNum];

    const newObj = { ...completedLessons, [courseId]: updated };
    setCompletedLessons(newObj);
    setStorageItem('completed_lessons', newObj);
  };

  return (
    <div className="flex flex-col w-full pb-10 space-y-4 px-gutter-mobile pt-3">
      {/* Header Info */}
      <div className="flex flex-col">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
          Curriculum Tracker
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-serif">
          My Learning Modules
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          UNILAG Faculty of Pharmacy 300L • Semester Courseware
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-all shrink-0 ${
              selectedFilter === f
                ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container'
            }`}
          >
            {f === 'All' ? 'All Subjects (6)' : `${f} Series`}
          </button>
        ))}
      </div>

      {/* Course Modules List */}
      <div className="space-y-3.5">
        {filteredCourses.map((course) => {
          const isExpanded = expandedCourse === course.id;
          const completedList = completedLessons[course.id] || [];
          const progressPercent = Math.round((completedList.length / course.totalLessons) * 100);

          return (
            <div
              key={course.id}
              className="bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container overflow-hidden transition-all"
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                className="p-4 cursor-pointer hover:bg-surface-container-low/40 transition-colors flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`${course.badgeColor} font-label-sm text-label-sm font-semibold px-2 py-0.5 rounded`}>
                      {course.code}
                    </span>
                    <span className="font-label-sm text-secondary font-semibold">
                      {course.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant font-label-sm">
                    <span>{progressPercent}%</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="font-headline-sm text-headline-sm text-primary leading-snug font-serif">
                    {course.title}
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="bg-primary-container h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-[12px] pt-0.5">
                  <span>{completedList.length} of {course.totalLessons} lessons completed</span>
                  <span className="flex items-center gap-1 text-primary-container font-semibold">
                    <Icon name="schedule" className="text-[14px]" />
                    {course.remainingMinutes}m remaining
                  </span>
                </div>
              </div>

              {/* Expandable Syllabus Items */}
              {isExpanded && (
                <div className="border-t border-surface-container bg-surface-container-low/30 p-4 space-y-2.5 animate-in fade-in">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Lesson Syllabus Breakdown
                  </span>
                  <div className="space-y-1.5">
                    {Array.from({ length: course.totalLessons }, (_, idx) => {
                      const num = idx + 1;
                      const done = completedList.includes(num);
                      return (
                        <div
                          key={num}
                          onClick={() => toggleLesson(course.id, num)}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer border border-surface-container/60"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-bold ${
                                done
                                  ? 'bg-primary-container text-on-primary'
                                  : 'bg-surface-container text-on-surface-variant'
                              }`}
                            >
                              {done ? '✓' : num}
                            </span>
                            <span className={`font-body-sm text-[13px] ${done ? 'line-through text-on-surface-variant' : 'text-on-surface font-medium'}`}>
                              Lesson {num}: {num === course.currentLesson ? course.nextTopic : `Topic Unit ${num}`}
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                            {done ? 'check_box' : 'check_box_outline_blank'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex gap-2">
                    <Link
                      href="/ai-tutor"
                      className="flex-1 bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm py-2 px-3 rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Icon name="psychology" className="text-[16px]" />
                      <span>Ask AI Tutor</span>
                    </Link>
                    <Link
                      href="/practice"
                      className="flex-1 bg-primary-container hover:bg-primary text-on-primary font-label-sm text-label-sm py-2 px-3 rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Icon name="fact_check" className="text-[16px]" />
                      <span>Practice Questions</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
