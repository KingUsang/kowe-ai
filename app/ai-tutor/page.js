'use client';

import { useState, useRef, useEffect } from 'react';
import { INITIAL_CHAT } from '@/lib/mockData';
import { getStorageItem, setStorageItem } from '@/lib/storage';

export default function AiTutor() {
  const [messages, setMessages] = useState(() => getStorageItem('ai_chat_messages', INITIAL_CHAT));
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState('Explain Concept');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setStorageItem('ai_chat_messages', messages);
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      name: 'Tunde (You)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse;
      const lower = query.toLowerCase();

      if (lower.includes('analogy')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'tutor',
          name: 'KOWE Academic Tutor',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'mnemonic',
          title: 'Everyday Mechanical Analogy: The Loaded Mousetrap',
          body: 'Think of the β-lactam ring as a set mousetrap primed with heavy tension. Normal stomach acid acts like a vibrating table that easily jars the trigger mechanism and trips the trap (ring breakage).\n\nAdding Electron-Withdrawing Groups (EWGs) is like putting a safety latch on the trigger, preventing unwanted vibrations from snapping it open before it reaches the bacteria.',
          tag: 'Conceptual Analogy • Pedagogical Clarifier'
        };
      } else if (lower.includes('mechanism') || lower.includes('step')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'tutor',
          name: 'KOWE Academic Tutor',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'pedagogical',
          intro: 'Here is the step-by-step mechanism of Beta-Lactam Ring Hydrolysis in Gastric Acid:',
          pillars: [
            {
              num: "1",
              title: "Protonation of Carbonyl Oxygen",
              text: "Hydronium ions (H3O+) in the gastric fluid protonate the C-7 carbonyl oxygen, enhancing the partial positive charge on the carbonyl carbon."
            },
            {
              num: "2",
              title: "Nucleophilic Attack",
              text: "Water molecules (or intramolecular acyl oxygens) readily attack the highly electrophilic carbon, overcoming the high activation energy due to severe 90° angle strain relief."
            },
            {
              num: "3",
              title: "Tetrahedral Intermediate Collapse",
              text: "The C-N bond cleaves irreversibly. The four-membered ring opens to yield inactive penicilloic acid."
            }
          ],
          breakthrough: {
            title: "UNILAG Marking Scheme Tip",
            text: "Always draw the curved arrows clearly showing the nitrogen lone pair non-involvement due to non-planarity with the adjacent thiazolidine ring."
          },
          citation: "Curriculum Standard: PCH 301 Syllabus Topic 4.2"
        };
      } else if (lower.includes('quiz') || lower.includes('mcq')) {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'tutor',
          name: 'KOWE Academic Tutor',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'mnemonic',
          title: 'Quick MCQ Challenge: Beta-Lactamase Resistance',
          body: 'Question: Which substitution on the penicillin nucleus confers steric resistance to staphylococcal beta-lactamase without sacrificing antimicrobial activity?\n\nA) Small C-6 alpha-methoxy group\nB) Bulky ortho-dimethoxyphenyl group (as in Methicillin)\nC) Extended polar side chain\nD) Deletion of C-3 carboxylate\n\nCorrect answer is B! The bulky aromatic rings sterically hinder beta-lactamase binding while fitting inside the PBP catalytic pocket.',
          tag: 'Instant Quiz • High Yield'
        };
      } else {
        botResponse = {
          id: `msg-${Date.now() + 1}`,
          sender: 'tutor',
          name: 'KOWE Academic Tutor',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'mnemonic',
          title: 'Syllabus-Aligned Analysis',
          body: `Regarding "${query}": In UNILAG Pharmacy 300L standards, this correlates closely with both pharmacokinetics and structure-activity relationships. Remember that polar substituents enhance Gram-negative porin penetration, while hydrophobic groups prolong plasma protein binding.`,
          tag: 'Academic Guidance • 300L Verified'
        };
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const scaffoldButtons = [
    { label: 'Give everyday analogy', icon: 'psychology_alt', color: 'text-secondary' },
    { label: 'Show step-by-step mechanism', icon: 'science', color: 'text-primary-container' },
    { label: 'Generate 3 practice MCQs', icon: 'quiz', color: 'text-secondary' },
    { label: 'Clinical dosing implications', icon: 'clinical_notes', color: 'text-primary-container' }
  ];

  return (
    <div className="flex flex-col w-full pb-36">
      {/* Top Academic Context Ribbon */}
      <div className="sticky top-16 z-30 bg-surface-container-low shadow-sm px-gutter-mobile py-2.5 flex flex-col gap-1.5 border-b border-surface-container">
        <div className="flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-container text-on-primary text-[10px] font-bold shrink-0">
              <span className="material-symbols-outlined text-[13px]">school</span>
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant truncate">
              PCH 301 • Pharm Chemistry II
            </span>
          </div>
          <button className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container hover:bg-surface-variant text-on-surface font-label-sm text-label-sm transition-colors shrink-0" type="button">
            <span>Syllabus Ref: Wk 4.2</span>
            <span className="material-symbols-outlined text-[14px]">tune</span>
          </button>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-headline-sm text-headline-sm text-primary leading-tight truncate font-serif">
            β-Lactam Ring Strain &amp; Acid Hydrolysis
          </h2>
          <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-semibold shrink-0">
            Exam High-Yield
          </span>
        </div>
        {/* Learning Objective Progress Bar */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-[14px] text-primary-container shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate text-[12px]">
              Objective: Acid degradation mechanisms &amp; EWG stabilization
            </p>
          </div>
          <span className="font-label-sm text-label-sm text-primary-container font-semibold shrink-0">Step 2 of 4</span>
        </div>
      </div>

      {/* Main Pedagogical Stream */}
      <div className="flex flex-col px-gutter-mobile py-space-md space-y-4">
        {/* Timestamp Header */}
        <div className="flex items-center justify-center my-1">
          <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
            Session active • UNILAG Session ID: #PHM-8492
          </span>
        </div>

        {/* Message Thread */}
        {messages.map((msg) => {
          if (msg.sender === 'student') {
            return (
              <div key={msg.id} className="flex flex-col items-end self-end max-w-[90%] space-y-1">
                <div className="flex items-center gap-1.5 mb-0.5 text-on-surface-variant">
                  <span className="font-label-sm text-label-sm font-semibold">{msg.name}</span>
                  <span className="font-label-sm text-label-sm text-outline">{msg.time}</span>
                </div>
                <div className="bg-primary text-on-primary rounded-xl rounded-tr-none px-4 py-3 shadow-sm">
                  <p className="font-body-md text-body-md leading-relaxed">{msg.text}</p>
                </div>
              </div>
            );
          }

          if (msg.type === 'pedagogical') {
            return (
              <div key={msg.id} className="flex flex-col items-start self-start w-full space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary-container flex items-center justify-center text-on-primary">
                    <span className="material-symbols-outlined text-[15px]">auto_stories</span>
                  </div>
                  <span className="font-label-md text-label-md text-primary font-semibold">{msg.name}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Syllabus-Aligned</span>
                </div>

                <div className="w-full bg-surface-container-lowest rounded-xl p-4 shadow-sm space-y-3.5 border border-surface-container">
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    {msg.intro}
                  </p>

                  <div className="space-y-3">
                    {msg.pillars?.map((pillar, idx) => (
                      <div key={idx} className="flex gap-2.5 p-2.5 rounded bg-surface-container-low">
                        <span className="font-label-md text-label-md font-bold text-secondary shrink-0 mt-0.5">{pillar.num}</span>
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md text-primary">{pillar.title}</span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            {pillar.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {msg.breakthrough && (
                    <div className="bg-primary-container text-on-primary rounded p-3 flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">lightbulb</span>
                        <span className="font-label-md text-label-md font-semibold text-tertiary-fixed">
                          {msg.breakthrough.title}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-surface-container leading-relaxed">
                        {msg.breakthrough.text}
                      </p>
                    </div>
                  )}

                  {msg.citation && (
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">bookmark</span>
                        {msg.citation}
                      </span>
                      <span className="font-semibold text-primary">8 Marks</span>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // Mnemonic or brief response
          return (
            <div key={msg.id} className="flex flex-col items-start self-start w-full space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary-container flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[15px]">auto_stories</span>
                </div>
                <span className="font-label-md text-label-md text-primary font-semibold">{msg.name}</span>
              </div>
              <div className="w-full bg-surface-container-lowest rounded-xl p-4 shadow-sm space-y-2.5 border border-surface-container">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">tips_and_updates</span>
                  <div className="flex flex-col">
                    <h3 className="font-title-md text-title-md text-primary">{msg.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed mt-1 whitespace-pre-line">
                      {msg.body}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-surface-container/60">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert('Marked as helpful!')}
                      className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-sm text-label-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">thumb_up</span> Helpful
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(msg.body);
                        alert('Copied to clipboard!');
                      }}
                      className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-sm text-label-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span> Copy
                    </button>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{msg.tag}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-surface-container-lowest rounded-xl w-32 border border-surface-container shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
            <span className="font-label-sm text-on-surface-variant text-[12px]">Analyzing...</span>
          </div>
        )}

        {/* Deepen Comprehension Scaffolding Pills */}
        <div className="w-full pt-2 flex flex-col gap-1.5">
          <span className="font-label-sm text-label-sm text-on-surface-variant px-0.5 font-semibold">Deepen comprehension:</span>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {scaffoldButtons.map((btn, i) => (
              <button
                key={i}
                onClick={() => handleSend(btn.label)}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-all active:scale-95 text-[13px]"
                type="button"
              >
                <span className={`material-symbols-outlined text-[16px] ${btn.color}`}>{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={chatEndRef} />
      </div>

      {/* Bottom Sticky Workspace & Console */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md px-gutter-mobile py-2.5 space-y-2 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-surface-container max-w-2xl mx-auto">
        {/* Pedagogical Mode Toggles */}
        <div className="flex items-center justify-between gap-1 bg-surface-container p-1 rounded-lg">
          {['Explain Concept', 'Quiz Me', 'Clinical Case'].map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`flex-1 py-1 px-2 text-center rounded font-label-sm text-label-sm transition-all text-[12px] ${
                activeMode === mode
                  ? 'bg-primary text-on-primary font-semibold shadow-xs'
                  : 'text-on-surface hover:bg-surface-container-high'
              }`}
              type="button"
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Input Box with Send Button */}
        <div className="relative flex items-center">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/70 font-body-md text-body-md pl-3.5 pr-12 py-2.5 rounded-xl border border-surface-container shadow-inner focus:outline-none focus:border-primary text-sm"
            placeholder="Ask a clarifying question or request past question analysis..."
            type="text"
          />
          <button
            onClick={() => handleSend()}
            aria-label="Send query"
            className="absolute right-1.5 w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container active:scale-95 transition-all shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
          </button>
        </div>
        <p className="text-center font-label-sm text-[11px] text-on-surface-variant/80 pb-0.5">
          Verified against National Universities Commission (NUC) Pharmacy benchmark.
        </p>
      </div>
    </div>
  );
}
