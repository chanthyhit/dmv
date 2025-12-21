import InfoCard from '@/components/cards/InfoCard'
import QuestionCard from '@/components/cards/QuestionCard'
import { modules, practiceQueue } from '@/data/modules'

const HomePage = () => {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-brand-accent/10 p-8 shadow-elevated">
        <div className="absolute left-16 top-8 h-32 w-32 rounded-full bg-brand/30 blur-3xl" />
        <div className="absolute right-10 top-0 h-28 w-28 rounded-full bg-brand-accent/25 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Driver Education
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Build your DMV-ready playbook
            </h1>
            <p className="max-w-2xl text-lg text-slate-200">
              Structured modules, practice cues, and a learning trail designed for teams that need
              predictable outcomes. Resume where you left off or launch a focused drill-down.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl bg-gradient-to-r from-brand to-brand-accent px-4 py-2 text-sm font-semibold text-slate-950 shadow-elevated transition hover:opacity-95">
                Continue knowledge session
              </button>
              <button className="rounded-xl border border-slate-800/80 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-brand hover:text-white">
                View learning plan
              </button>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-300">
              <span className="rounded-full border border-slate-800/70 bg-slate-900/60 px-3 py-1">
                Auto-saves progress
              </span>
              <span className="rounded-full border border-slate-800/70 bg-slate-900/60 px-3 py-1">
                Instructor dashboard ready
              </span>
              <span className="rounded-full border border-slate-800/70 bg-slate-900/60 px-3 py-1">
                Tailwind + React + TypeScript
              </span>
            </div>
          </div>
          <div className="grid gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 backdrop-blur">
            <h2 className="text-base font-semibold text-white">Module health</h2>
            <div className="grid gap-3">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-slate-800/70 bg-slate-900/70 px-4 py-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">{module.name}</p>
                    <p className="text-xs text-slate-400">{module.description}</p>
                    <p className="text-xs font-semibold text-slate-200">{module.trend}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{module.coverage}</p>
                    <span
                      className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
                        module.state === 'healthy'
                          ? 'bg-emerald-400/15 text-emerald-200 ring-emerald-400/30'
                          : 'bg-amber-400/15 text-amber-200 ring-amber-400/40'
                      }`}
                    >
                      {module.state === 'healthy' ? 'On track' : 'Monitor'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          title="Module coverage"
          value="28 / 45"
          badge="On track"
          description="Across core rules, signs, and readiness sequences with rubric visibility."
          tone="sky"
        />
        <InfoCard
          title="Weekly drills"
          value="6 sessions"
          badge="Autoscheduled"
          description="Cadence-based drills with timeboxed retakes for flagged objectives."
          tone="violet"
        />
        <InfoCard
          title="Feedback items"
          value="3 follow-ups"
          badge="Instructor queue"
          description="Pending clarifications on hazard responses and right-of-way edge cases."
          tone="emerald"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Practice queue</h2>
            <button className="text-sm font-semibold text-brand hover:text-brand-accent">
              View all
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {practiceQueue.map((item) => (
              <QuestionCard
                key={item.id}
                title={item.title}
                prompt={item.prompt}
                answer={item.answer}
                tag={item.tag}
                state={item.state}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-elevated">
          <h2 className="text-xl font-semibold text-white">Next actions</h2>
          <ul className="space-y-3 text-sm text-slate-200">
            <li className="flex gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
              <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Publish the updated stop/yield scenario walkthrough.
            </li>
            <li className="flex gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
              <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-brand" />
              Add timed quiz variant for work-zone merges.
            </li>
            <li className="flex gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
              <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-amber-300" />
              Record an instructor note on night-driving readiness.
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default HomePage
