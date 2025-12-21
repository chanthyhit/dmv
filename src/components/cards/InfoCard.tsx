type InfoCardProps = {
  title: string
  value: string
  badge?: string
  description?: string
  tone?: 'sky' | 'violet' | 'emerald'
}

const toneClassMap: Record<NonNullable<InfoCardProps['tone']>, string> = {
  sky: 'from-cyan-400/25 to-cyan-400/0 border-cyan-400/30 text-cyan-100',
  violet: 'from-brand-accent/25 to-brand-accent/0 border-brand-accent/30 text-violet-100',
  emerald: 'from-emerald-400/25 to-emerald-400/0 border-emerald-400/30 text-emerald-100',
}

const InfoCard = ({ title, value, badge, description, tone = 'sky' }: InfoCardProps) => {
  const toneClasses = toneClassMap[tone]

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800/70 bg-card/80 shadow-elevated">
      <div
        className={`relative flex flex-col gap-3 border-b border-slate-800/60 bg-gradient-to-br ${toneClasses} px-5 py-4`}
      >
        <div className="text-sm font-medium uppercase tracking-[0.16em] text-slate-300/90">
          {title}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-white">{value}</p>
          {badge ? (
            <span className="rounded-full bg-slate-950/40 px-3 py-1 text-xs font-semibold text-slate-100 ring-1 ring-slate-700/60">
              {badge}
            </span>
          ) : null}
        </div>
      </div>
      {description ? (
        <div className="px-5 py-4 text-sm text-slate-300">{description}</div>
      ) : null}
    </article>
  )
}

export default InfoCard
