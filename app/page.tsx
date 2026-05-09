'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Command,
  Eye,
  Globe2,
  History,
  Layers3,
  MousePointer2,
  Play,
  Radar,
  ShieldCheck,
  Sparkles,
  Wand2,
  Zap,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const tasks = [
  'Find the latest testnet quest and summarize eligibility',
  'Open dashboard, detect wallet state, suggest next safe action',
  'Monitor a launch page and build a repeatable claim workflow',
];

const workflowCards = [
  { title: 'Read Page', desc: 'Scans headings, forms, CTAs, wallet prompts.', icon: Eye, status: 'Active' },
  { title: 'Plan Actions', desc: 'Turns messy websites into clean step-by-step flows.', icon: BrainCircuit, status: 'Thinking' },
  { title: 'Assist Clicks', desc: 'Suggests low-risk browser actions with human confirmation.', icon: MousePointer2, status: 'Ready' },
  { title: 'Save Workflow', desc: 'Stores the playbook so the task can be repeated later.', icon: Layers3, status: 'Logged' },
];

const history = [
  { site: 'orbit.quest', action: 'Mapped onboarding flow', time: '14s ago', ok: true },
  { site: 'sepolia.bridge', action: 'Suggested wallet preparation', time: '2m ago', ok: true },
  { site: 'docs.mimo.ai', action: 'Extracted API task checklist', time: '7m ago', ok: true },
];

const suggestions = [
  'This page has a hidden eligibility checklist. Generate a route map?',
  'Wallet prompt detected. Recommend manual approval before signature.',
  'I can turn this sequence into a reusable browser workflow.',
];

function Typewriter({ lines }: { lines: string[] }) {
  const [line, setLine] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    const current = lines[line % lines.length];
    if (text.length < current.length) {
      const t = setTimeout(() => setText(current.slice(0, text.length + 1)), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setText('');
      setLine((v) => v + 1);
    }, 1600);
    return () => clearTimeout(t);
  }, [line, lines, text]);

  return (
    <span>
      {text}
      <span className="typing-caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-cyan-300" />
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(69,231,255,.9)]" />
      {children}
    </span>
  );
}

function ThinkingIndicator() {
  return (
    <div className="mt-3 flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs text-slate-400">
      <span className="text-cyan-300">AI thinking</span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="thinking-dot h-1.5 w-1.5 rounded-full bg-cyan-300"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
      <span className="ml-auto font-mono text-[10px] text-violet-200/80">42ms</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mt-4 space-y-2" aria-label="loading workflow skeleton">
      <div className="skeleton h-2.5 w-11/12" />
      <div className="skeleton h-2.5 w-8/12" />
      <div className="grid grid-cols-3 gap-2 pt-1">
        <div className="skeleton h-8 rounded-xl" />
        <div className="skeleton h-8 rounded-xl" />
        <div className="skeleton h-8 rounded-xl" />
      </div>
    </div>
  );
}

function RippleButton({ children, className = '', href }: { children: React.ReactNode; className?: string; href?: string }) {
  const content = <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>;
  const classes = `ripple-surface ${className}`;
  return href ? <a href={href} className={classes}>{content}</a> : <button className={classes}>{content}</button>;
}

function AIProgress() {
  const statuses = ['Scanning DOM signals', 'Reading wallet surfaces', 'Planning safe sequence', 'Workflow almost ready'];
  const [step, setStep] = useState(0);
  const progress = 24 + step * 22;

  useEffect(() => {
    const timer = setInterval(() => setStep((v) => (v + 1) % statuses.length), 1700);
    return () => clearInterval(timer);
  }, [statuses.length]);

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="live-pulse h-2 w-2 rounded-full bg-emerald-300" />
          <span>{statuses[step]}</span>
        </div>
        <span className="font-mono text-xs text-cyan-300">{progress}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-300 to-fuchsia-400"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {statuses.map((item, i) => (
          <div key={item} className={`h-1 rounded-full transition ${i <= step ? 'bg-cyan-300/80' : 'bg-white/10'}`} />
        ))}
      </div>
    </div>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const commands = [
    ['Analyze website', 'Read the current page and summarize action paths'],
    ['Detect wallet prompts', 'Find wallet gates, signatures, and approval steps'],
    ['Generate workflow', 'Create a reusable browser task sequence'],
    ['Safe assist scan', 'Highlight risky actions before execution'],
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-start bg-black/45 px-4 pt-24 backdrop-blur-sm sm:place-items-center sm:pt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="command-panel glass w-full max-w-2xl overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <Command className="h-5 w-5 text-cyan-300" />
              <div className="flex-1 font-mono text-sm text-slate-300">Ask GhostPilot to...</div>
              <kbd className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-400">Esc</kbd>
            </div>
            <div className="p-3">
              {commands.map(([title, desc], i) => (
                <motion.button
                  key={title}
                  className="hover-lift flex w-full items-center gap-4 rounded-2xl border border-transparent p-4 text-left hover:bg-white/[0.045]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.055 }}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] text-cyan-200">
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-white">{title}</span>
                    <span className="mt-1 block text-xs text-slate-500">{desc}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-500" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FloatingChatBubble({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group fixed bottom-5 right-5 z-40 grid h-16 w-16 place-items-center rounded-3xl border border-cyan-300/20 bg-[#080a12]/80 text-cyan-100 shadow-[0_0_45px_rgba(69,231,255,.25)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/50 sm:bottom-7 sm:right-7"
      aria-label="Open GhostPilot command palette"
    >
      <span className="assistant-orb absolute inset-0 rounded-3xl" />
      <Bot className="relative z-10 h-7 w-7" />
      <span className="pointer-events-none absolute bottom-full right-0 mb-3 w-max translate-y-1 rounded-xl border border-white/10 bg-black/80 px-3 py-2 text-xs text-slate-200 opacity-0 shadow-2xl backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
        GhostPilot is watching
      </span>
    </button>
  );
}

function BrowserMock() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((v) => (v + 1) % 4), 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="glass neon-ring scanline relative overflow-hidden rounded-[28px] p-3"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-3 pb-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-3 flex-1 rounded-full border border-white/10 bg-black/30 px-4 py-2 font-mono text-xs text-slate-400">
          https://app.orbit-labs.ai/quest/live
        </div>
        <Command className="h-4 w-4 text-slate-500" />
      </div>

      <div className="grid gap-3 p-3 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-2xl border border-white/10 bg-[#080a12]/80 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Live browser read</p>
              <h3 className="mt-2 text-xl font-semibold">Orbit Quest Console</h3>
            </div>
            <Badge>AI watching</Badge>
          </div>
          <div className="space-y-3">
            {['Connect wallet gate detected', 'Quest list indexed: 8 actions', 'Risky signature: none found', 'Suggested workflow ready'].map((item, index) => (
              <motion.div
                key={item}
                animate={{ opacity: active >= index ? 1 : 0.42, x: active === index ? 6 : 0 }}
                className="hover-lift flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3"
              >
                <div className={`grid h-8 w-8 place-items-center rounded-lg ${active >= index ? 'bg-cyan-300/15 text-cyan-200' : 'bg-white/5 text-slate-500'}`}>
                  {active > index ? <CheckCircle2 className="h-4 w-4" /> : <Radar className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-100">{item}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-white/5">
                    <motion.div
                      animate={{ width: active >= index ? '100%' : '28%' }}
                      transition={{ duration: 0.7 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-violet-500/20 text-violet-200">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">GhostPilot Core</p>
              <p className="text-xs text-slate-500">Reasoning stream</p>
            </div>
          </div>
          <div className="min-h-28 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-4 font-mono text-sm leading-7 text-cyan-50">
            <Typewriter lines={suggestions} />
          </div>
          <ThinkingIndicator />
          <button className="hover-lift mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-100">
            Generate workflow <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardPreview() {
  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge>Dashboard MVP</Badge>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">A futuristic cockpit for web tasks.</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400 md:text-base">Reviewer can instantly understand the story: user gives a task, GhostPilot reads the website, suggests actions, and saves a workflow.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
        <div className="glass rounded-3xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">AI Task Input</h3>
            <Sparkles className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
            <p className="font-mono text-sm text-slate-300"><Typewriter lines={tasks} /></p>
            <LoadingSkeleton />
          </div>
          <AIProgress />
          <div className="mt-4 flex flex-wrap gap-2">
            {['Read', 'Plan', 'Suggest', 'Automate'].map((item) => <Badge key={item}>{item}</Badge>)}
          </div>
          <button className="hover-lift mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-4 py-3 font-semibold text-white shadow-[0_0_42px_rgba(113,112,255,.28)]">
            <Play className="h-4 w-4 fill-white" /> Launch Ghost Run
          </button>
        </div>

        <div className="glass rounded-3xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Workflow Cards</h3>
            <p className="font-mono text-xs text-cyan-300">LIVE / 04 STEPS</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {workflowCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="hover-lift rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 text-cyan-200"><Icon className="h-5 w-5" /></div>
                    <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-slate-400">{card.status}</span>
                  </div>
                  <h4 className="font-semibold">{card.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{card.desc}</p>
                  {i === 1 && <LoadingSkeleton />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 18 });
  const particles = useMemo(() => Array.from({ length: 34 }, (_, i) => ({ i, left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, delay: (i % 7) * 0.25 })), []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setMouse({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="motion-aurora" />
      <div
        className="mouse-glow"
        style={{ left: `${mouse.x}%`, top: `${mouse.y}%` }}
      />
      <div className="beam beam-one" />
      <div className="beam beam-two" />
      <div className="grid-bg absolute inset-0" />
      {particles.map((p) => (
        <motion.span
          key={p.i}
          className="float-particle absolute h-1 w-1 rounded-full bg-cyan-200/70 text-cyan-200"
          style={{ left: p.left, top: p.top }}
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.85, 0.15] }}
          transition={{ duration: 4 + (p.i % 5), repeat: Infinity, delay: p.delay }}
        />
      ))}

      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#05060a]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-300 text-black shadow-[0_0_35px_rgba(69,231,255,.25)]">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold tracking-tight">GhostPilot AI</p>
              <p className="text-xs text-slate-500">Browser co-pilot</p>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
            <a href="#product" className="transition hover:text-white">Product</a>
            <a href="#dashboard" className="transition hover:text-white">Dashboard</a>
            <a href="#flow" className="transition hover:text-white">Flow</a>
          </div>
          <button onClick={() => setCommandOpen(true)} className="hover-lift hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 sm:inline-flex">
            <Command className="h-3.5 w-3.5 text-cyan-300" />
            <span>Cmd+K</span>
          </button>
          <a href="#dashboard" className="hover-lift rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white hover:bg-white/10">View demo</a>
        </div>
      </nav>

      <motion.section id="product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Badge>AI-native browser automation showcase</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-6 text-5xl font-medium leading-[0.96] tracking-[-0.07em] text-white sm:text-6xl lg:text-7xl"
          >
            Turn any website into an <span className="text-gradient">AI-operated workspace.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg"
          >
            GhostPilot AI reads web pages, understands user intent, suggests smart actions, and transforms repetitive browser tasks into smooth reusable workflows.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <RippleButton href="#dashboard" className="hover-lift inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-black hover:bg-cyan-100">
              Launch MVP demo <ArrowRight className="h-4 w-4" />
            </RippleButton>
            <RippleButton href="#flow" className="hover-lift inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 font-semibold text-white hover:bg-white/10">
              See AI flow <ChevronRight className="h-4 w-4" />
            </RippleButton>
          </motion.div>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[['AI', 'Page Reader'], ['4-step', 'Workflow'], ['0 backend', 'Deploy-ready']].map(([a,b]) => (
              <div key={a} className="hover-lift rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-lg font-semibold text-white">{a}</p>
                <p className="text-xs text-slate-500">{b}</p>
              </div>
            ))}
          </div>
        </div>
        <BrowserMock />
      </motion.section>

      <DashboardPreview />

      <section id="flow" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <Badge>AI Interaction Flow</Badge>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em]">Human intent → AI plan → browser action.</h2>
              </div>
              <Wand2 className="hidden h-10 w-10 text-violet-300 md:block" />
            </div>
            <div className="space-y-3">
              {[
                ['01', 'User asks GhostPilot to complete a browser task.'],
                ['02', 'AI reads the active website and detects forms, CTAs, risk, and missing context.'],
                ['03', 'GhostPilot proposes smart actions instead of blindly clicking.'],
                ['04', 'Approved steps become reusable workflow cards and history.'],
              ].map(([num, text]) => (
                <div key={num} className="hover-lift flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                  <span className="font-mono text-sm text-cyan-300">{num}</span>
                  <p className="text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold">Automation History</h3>
              <History className="h-5 w-5 text-slate-500" />
            </div>
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.site} className="hover-lift rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-xs text-cyan-300">{item.site}</p>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500"><Clock3 className="h-3 w-3" /> {item.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{item.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            [Globe2, 'Reads websites', 'Summarizes page state and intent-relevant elements.'],
            [ShieldCheck, 'Safe assist mode', 'Highlights risky wallet or signature steps for human review.'],
            [Zap, 'Twitter-ready wow', 'Animated glass UI, live typing, and futuristic product story.'],
          ].map(([Icon, title, desc]) => {
            const I = Icon as typeof Globe2;
            return (
              <div key={title as string} className="glass hover-lift rounded-3xl p-6">
                <I className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-5 font-semibold">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{desc as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500">
        GhostPilot AI — showcase MVP for Xiaomi MiMo Orbit / AI Builder Program. Built with Next.js, TailwindCSS, TypeScript, and Framer Motion.
      </footer>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <FloatingChatBubble onOpen={() => setCommandOpen(true)} />
    </main>
  );
}
