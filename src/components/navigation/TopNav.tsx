import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'Docs', path: '/docs' },
]

const TopNav = () => {
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
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition ${
                    isActive ? 'bg-slate-800/80 text-white' : 'hover:bg-slate-800/60 hover:text-white'
                  }`
                }
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default TopNav
