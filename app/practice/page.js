'use client';
import Icon from '@/components/Icon';

import { useState } from 'react';
import Link from 'next/link';
import { PRACTICE_QUESTIONS } from '@/lib/mockData';

export default function PracticeAssessments() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [activeMode, setActiveMode] = useState('practice'); // 'practice' | 'timed'

  const currentQ = PRACTICE_QUESTIONS[currentIndex];
  const userChoice = selectedAnswers[currentQ.id];

  const handleSelectOption = (key) => {
    if (activeMode === 'practice') {
      setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: key });
      setShowExplanation(true);
    } else {
      setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: key });
    }
  };

  const handleNext = () => {
    if (currentIndex < PRACTICE_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(!!selectedAnswers[PRACTICE_QUESTIONS[currentIndex + 1]?.id]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowExplanation(!!selectedAnswers[PRACTICE_QUESTIONS[currentIndex - 1]?.id]);
    }
  };

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Assessment Context Header */}
      <div className="px-gutter-mobile pt-3 pb-2 flex flex-col gap-space-sm bg-surface-container-low shadow-sm border-b border-surface-container">
        {/* Top Row */}
        <div className="flex items-center justify-between gap-space-sm">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-lowest text-primary shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-label-sm text-label-sm tracking-tight font-semibold">
              {currentQ.course} • {currentQ.topic}
            </span>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md">
            <Icon name="schedule" className="text-[16px] text-secondary" />
            <span className="tabular-nums font-medium text-xs">28:14</span>
          </div>
        </div>

        {/* Mode Switcher Pill */}
        <div className="grid grid-cols-2 p-1 bg-surface-container rounded gap-1">
          <button
            onClick={() => setActiveMode('practice')}
            className={`py-1.5 px-2 rounded font-label-sm text-label-sm text-center flex items-center justify-center gap-1 transition-all ${
              activeMode === 'practice'
                ? 'bg-surface-container-lowest shadow-sm text-primary font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            type="button"
          >
            <span
              className="material-symbols-outlined text-[15px] text-primary-container"
              style={{ fontVariationSettings: activeMode === 'practice' ? "'FILL' 1" : "'FILL' 0" }}
            >
              bolt
            </span>
            <span>Practice Mode (Instant Feedback)</span>
          </button>
          <Link
            href="/exam"
            className="py-1.5 px-2 rounded text-on-surface-variant hover:text-primary font-label-sm text-label-sm text-center flex items-center justify-center gap-1 transition-all"
          >
            <Icon name="timer" className="text-[15px]" />
            <span>Timed Mock (45m)</span>
          </Link>
        </div>

        {/* Progress Tracker & Past Question Heritage */}
        <div className="flex flex-col gap-1.5 pt-0.5">
          <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span className="font-semibold text-primary">Question {currentIndex + 1} of {PRACTICE_QUESTIONS.length}</span>
            <span className="inline-flex items-center gap-1 text-secondary font-medium">
              <Icon name="verified" className="text-[13px]" />
              <span>{currentQ.tag}</span>
            </span>
          </div>

          {/* Segmented Step Progress Bar */}
          <div className="grid grid-cols-4 gap-1.5 w-full h-1.5">
            {PRACTICE_QUESTIONS.map((q, idx) => {
              const isAnswered = !!selectedAnswers[q.id];
              const isCurrent = idx === currentIndex;
              return (
                <div
                  key={q.id}
                  className={`h-full rounded-sm transition-all ${
                    isCurrent
                      ? 'bg-secondary'
                      : isAnswered
                      ? 'bg-primary-container'
                      : 'bg-surface-container-highest'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Question Body */}
      <div className="px-gutter-mobile pt-4 flex flex-col gap-space-md">
        {/* Scholastic Question Stem Box */}
        <div className="bg-surface-container-lowest p-space-md rounded shadow-sm flex flex-col gap-space-sm relative overflow-hidden border border-surface-container">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              {currentQ.type}
            </span>
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
              PCN Standard • Single Best Answer
            </span>
          </div>
          <p className="font-headline-sm text-headline-sm text-on-surface leading-relaxed pt-1 font-serif">
            {currentQ.prompt}
          </p>
          {/* Key Concept Micro-tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentQ.conceptTags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-surface-container-low text-primary-container font-label-sm text-label-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Options Section */}
        <div className="flex flex-col gap-2.5">
          {currentQ.options.map((option) => {
            const isSelected = userChoice === option.key;
            const isCorrect = option.key === currentQ.correctAnswer;
            const showStatus = showExplanation && isSelected;

            return (
              <div
                key={option.key}
                onClick={() => handleSelectOption(option.key)}
                className={`cursor-pointer flex flex-col p-3.5 rounded transition-all border ${
                  isSelected
                    ? isCorrect
                      ? 'bg-primary-fixed/30 border-primary-container shadow-md'
                      : 'bg-error-container/40 border-error shadow-sm'
                    : 'bg-surface-container-lowest border-surface-container hover:bg-surface-container-low shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded font-title-md text-title-md flex items-center justify-center shrink-0 ${
                        isSelected
                          ? isCorrect
                            ? 'bg-primary-container text-on-primary'
                            : 'bg-error text-on-error'
                          : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {option.key}
                    </span>
                    <span className="font-body-md text-body-md text-on-surface">
                      {option.text}
                    </span>
                  </div>
                  {showStatus && (
                    <span className={`material-symbols-outlined text-[20px] ${isCorrect ? 'text-primary-container' : 'text-error'}`}>
                      {isCorrect ? 'check_circle' : 'cancel'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Instant Pedagogical Feedback Box */}
        {showExplanation && (
          <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-2.5 border border-surface-container animate-in fade-in">
            <div className="flex items-center gap-1.5 text-primary">
              <Icon name="verified" className="text-[18px]" />
              <span className="font-title-md text-[14px]">Model Solution &amp; Rationale</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
              {currentQ.explanation}
            </p>
            <div className="pt-1 text-[11px] font-label-sm text-on-surface-variant flex items-center justify-between border-t border-surface-container/60">
              <span>{currentQ.pastExamInfo}</span>
              <Link href="/ai-tutor" className="text-primary-container font-semibold hover:underline flex items-center gap-0.5">
                <span>Ask AI Tutor to clarify</span>
                <Icon name="arrow_forward" className="text-[13px]" />
              </Link>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 pb-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-lg font-label-sm text-label-sm flex items-center gap-1 transition-colors ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-surface-container text-on-surface-variant'
                : 'bg-surface-container hover:bg-surface-container-high text-primary'
            }`}
          >
            <Icon name="arrow_back" className="text-[16px]" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === PRACTICE_QUESTIONS.length - 1}
            className={`px-4 py-2 rounded-lg font-label-sm text-label-sm flex items-center gap-1 transition-colors ${
              currentIndex === PRACTICE_QUESTIONS.length - 1
                ? 'opacity-40 cursor-not-allowed bg-surface-container text-on-surface-variant'
                : 'bg-primary-container hover:bg-primary text-on-primary'
            }`}
          >
            <span>Next Question</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
