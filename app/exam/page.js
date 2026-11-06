'use client';
import Icon from '@/components/Icon';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EXAM_QUESTIONS_40 } from '@/lib/mockData';
import { getStorageItem, setStorageItem } from '@/lib/storage';

export default function TimedExamMode() {
  const router = useRouter();
  const [questions, setQuestions] = useState(() =>
    getStorageItem('exam_questions_state', EXAM_QUESTIONS_40)
  );
  const [currentIndex, setCurrentIndex] = useState(6); // Question #7 by default as in Stitch
  const [secondsLeft, setSecondsLeft] = useState(() =>
    getStorageItem('exam_time_left', 32 * 60 + 14) // 32:14
  );
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSubmitted(true);
          return 0;
        }
        setStorageItem('exam_time_left', prev - 1);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  const currentQ = questions[currentIndex];

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectOption = (key) => {
    const updated = questions.map((q, idx) =>
      idx === currentIndex ? { ...q, answered: key } : q
    );
    setQuestions(updated);
    setStorageItem('exam_questions_state', updated);
  };

  const toggleFlag = () => {
    const updated = questions.map((q, idx) =>
      idx === currentIndex ? { ...q, flagged: !q.flagged } : q
    );
    setQuestions(updated);
    setStorageItem('exam_questions_state', updated);
  };

  const answeredCount = questions.filter((q) => !!q.answered).length;
  const flaggedCount = questions.filter((q) => q.flagged).length;
  const unattemptedCount = questions.length - answeredCount;

  if (submitted) {
    const score = questions.filter((q) => q.answered === q.correctAnswer).length;
    return (
      <div className="flex flex-col w-full p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-primary-container text-on-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
          ✓
        </div>
        <h1 className="font-headline-md text-primary font-serif">Exam Submitted Successfully!</h1>
        <p className="font-body-md text-on-surface-variant">
          UNILAG PCN Standard Mock Exam Finished
        </p>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-sm space-y-3 max-w-sm mx-auto w-full">
          <div className="text-4xl font-bold text-primary">{score} / {questions.length}</div>
          <span className="font-label-sm text-secondary uppercase font-semibold">
            {Math.round((score / questions.length) * 100)}% Overall Score
          </span>
          <div className="pt-2 text-xs text-on-surface-variant">
            Performance has been logged to your Academic Progress portfolio.
          </div>
        </div>

        <div className="flex gap-3 justify-center pt-4">
          <Link
            href="/progress"
            className="px-4 py-2 bg-primary-container text-on-primary rounded-lg font-label-md"
          >
            View Progress Report
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-surface-container text-primary rounded-lg font-label-md"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Mode Switcher Pill Banner */}
      <div className="px-gutter-mobile pt-space-sm pb-space-xs">
        <div className="bg-surface-container-high p-1 rounded-full flex items-center justify-between shadow-xs">
          <div className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full bg-primary-container text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
              timer
            </span>
            <span className="font-label-sm text-label-sm font-semibold tracking-wide">
              Timed Mock (45m)
            </span>
          </div>
          <Link
            href="/practice"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full text-on-surface-variant hover:text-primary transition-colors"
          >
            <Icon name="menu_book" className="text-[16px]" />
            <span className="font-label-sm text-label-sm">Practice Mode</span>
          </Link>
        </div>
      </div>

      {/* Real-time Exam HUD & Timer Strip */}
      <div className="px-gutter-mobile py-space-sm">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm border border-surface-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
                <Icon name="alarm" className="text-[18px]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-title-md font-bold text-primary tracking-tight font-mono" id="countdown-display">
                    {formatTimer(secondsLeft)}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                    Remaining
                  </span>
                </div>
                <p className="font-label-sm text-[11px] text-on-surface-variant leading-none">
                  PCN Exam Standard • Non-invigilated Mock
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-low text-primary-container hover:bg-surface-container transition-colors"
              id="open-palette-btn"
              type="button"
            >
              <Icon name="grid_view" className="text-[18px]" />
              <span className="font-label-sm text-label-sm font-semibold">
                Q {currentIndex + 1}/40
              </span>
            </button>
          </div>

          {/* Segmented Multi-State Exam Progress Bar */}
          <div className="w-full flex flex-col gap-1.5 pt-1">
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden flex">
              <div
                className="h-full bg-primary-container transition-all duration-300"
                style={{ width: `${(answeredCount / 40) * 100}%` }}
                title={`Answered (${answeredCount})`}
              />
              <div
                className="h-full bg-secondary-container transition-all duration-300"
                style={{ width: `${(flaggedCount / 40) * 100}%` }}
                title={`Flagged (${flaggedCount})`}
              />
              <div
                className="h-full bg-surface-container-highest"
                style={{ width: `${(unattemptedCount / 40) * 100}%` }}
                title={`Unattempted (${unattemptedCount})`}
              />
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary-container inline-block"></span>
                {answeredCount} Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary-container inline-block"></span>
                {flaggedCount} Flagged
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-surface-container-highest inline-block"></span>
                {unattemptedCount} Left
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Question Card (Clinical Vignette) */}
      <div className="px-gutter-mobile pb-space-sm">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md border border-surface-container">
          {/* Scholastic Meta Tags */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-surface-container text-primary-container font-label-sm text-label-sm font-semibold">
                {currentQ.course}
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                {currentQ.department}
              </span>
              <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
                {currentQ.year}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              {currentQ.marks}
            </span>
          </div>

          {/* Question Stem Header */}
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                {currentQ.caseTitle}
              </span>
              <h2 className="font-headline-sm text-headline-sm text-primary font-serif leading-snug">
                {currentQ.title}
              </h2>
            </div>
            <button
              onClick={toggleFlag}
              aria-label="Flag Question"
              className={`p-2 rounded-lg transition-colors flex items-center justify-center shrink-0 ${
                currentQ.flagged
                  ? 'bg-secondary-fixed text-secondary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
              id="flag-btn"
              type="button"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: currentQ.flagged ? "'FILL' 1" : "'FILL' 0" }}
              >
                flag
              </span>
            </button>
          </div>

          <p className="font-body-md text-body-md text-on-surface leading-relaxed">
            {currentQ.stem}
          </p>

          {/* MCQ Options */}
          <div className="space-y-2 pt-1">
            {currentQ.options.map((opt) => {
              const isSelected = currentQ.answered === opt.key;
              return (
                <div
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-primary-container text-on-primary border-primary'
                      : 'bg-surface-container-low/40 border-surface-container hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-primary-fixed text-primary'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="font-body-sm text-[13px] leading-snug">{opt.text}</span>
                </div>
              );
            })}
          </div>

          {/* Exam Navigation Footer inside Card */}
          <div className="flex items-center justify-between pt-3 border-t border-surface-container/60">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm flex items-center gap-1 ${
                currentIndex === 0 ? 'opacity-40 cursor-not-allowed text-on-surface-variant' : 'text-primary hover:bg-surface-container'
              }`}
            >
              <Icon name="arrow_back" className="text-[16px]" />
              <span>Previous</span>
            </button>

            <div className="flex gap-2">
              <Link
                href="/exam/scratchpad"
                className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center gap-1"
              >
                <Icon name="draw" className="text-[16px]" />
                <span>Scratchpad</span>
              </Link>

              <button
                onClick={() => {
                  if (currentIndex < 39) {
                    setCurrentIndex(currentIndex + 1);
                  } else {
                    if (confirm('Submit all 40 questions now?')) setSubmitted(true);
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center gap-1 shadow-xs"
              >
                <span>{currentIndex === 39 ? 'Submit Exam' : 'Next'}</span>
                <span className="material-symbols-outlined text-[16px]">
                  {currentIndex === 39 ? 'check' : 'arrow_forward'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Palette Modal */}
      {isPaletteOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-surface-container animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div>
                <h3 className="font-title-md text-primary font-semibold">Question Grid (40)</h3>
                <p className="font-label-sm text-xs text-on-surface-variant">Tap any question to jump</p>
              </div>
              <button
                onClick={() => setIsPaletteOpen(false)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto py-3 scrollbar-none">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!q.answered;
                const isFlagged = q.flagged;

                let bg = 'bg-surface-container text-on-surface-variant';
                if (isAnswered) bg = 'bg-primary-container text-on-primary';
                if (isFlagged) bg = 'bg-secondary text-on-secondary';
                if (isCurrent) bg = `${bg} ring-2 ring-primary ring-offset-2`;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsPaletteOpen(false);
                    }}
                    className={`h-9 rounded-lg font-label-sm text-xs font-semibold flex items-center justify-center transition-all ${bg}`}
                  >
                    {q.number}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-surface-container flex items-center justify-between">
              <button
                onClick={() => {
                  setIsPaletteOpen(false);
                  if (confirm('Are you sure you want to finalize and submit this exam?')) setSubmitted(true);
                }}
                className="w-full bg-secondary text-on-secondary py-2.5 rounded-lg font-label-md text-label-md font-semibold hover:bg-on-secondary-container transition-colors"
              >
                Submit Exam ({answeredCount}/40)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
