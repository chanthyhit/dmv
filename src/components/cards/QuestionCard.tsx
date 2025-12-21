type QuestionCardProps = {
  title: string
  prompt: string
  answer: string
  tag: string
  state?: 'ready' | 'in-progress' | 'review'
}

const tagTone: Record<NonNullable<QuestionCardProps['state']>, string> = {
  ready: 'bg-emerald-400/15 text-emerald-200 ring-emerald-400/30',
  'in-progress': 'bg-amber-400/15 text-amber-200 ring-amber-400/40',
  review: 'bg-slate-200/15 text-slate-200 ring-slate-300/30',
}

const QuestionCard = ({ title, prompt, answer, tag, state = 'ready' }: QuestionCardProps) => {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-800/80 bg-card/80 px-5 py-4 shadow-elevated">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{tag}</p>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tagTone[state]}`}
        >
          {state === 'ready' ? 'Ready' : state === 'review' ? 'Needs review' : 'In progress'}
        </span>
      </div>
      <p className="text-sm text-slate-300">{prompt}</p>
      <div className="rounded-lg border border-slate-800/80 bg-slate-900/50 px-4 py-3 text-sm text-slate-200">
        {answer}
      </div>
    </article>
  )
}

export default QuestionCard
