type TopNavProps = {
  currentPage?: 'home' | 'docs'
  onNavigate?: (page: 'home' | 'docs') => void
}

const navLinks = [
  { label: 'Dashboard', key: 'home' as const },
  { label: 'Docs', key: 'docs' as const },
]

const TopNav = ({ currentPage = 'home', onNavigate }: TopNavProps) => {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-accent text-sm font-extrabold text-slate-950 shadow-elevated">
            DMV
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Driver Knowledge
            </p>
            <p className="text-lg font-semibold text-white">Training Console</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav className="hidden gap-3 text-sm text-slate-300 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.key}
                type="button"
                onClick={() => onNavigate?.(link.key)}
                className={`rounded-lg px-3 py-2 transition ${
                  currentPage === link.key
                    ? 'bg-slate-800/80 text-white'
                    : 'hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="rounded-lg bg-gradient-to-r from-brand to-brand-accent px-4 py-2 text-sm font-semibold text-slate-950 shadow-elevated transition hover:opacity-95"
            onClick={() => onNavigate?.('docs')}
          >
            Docs
          </button>
        </div>
      </div>
    </header>
  )
}

export default TopNav
