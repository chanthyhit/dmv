import type { ReactNode } from 'react'
import TopNav from '@/components/navigation/TopNav'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopNav />
      <main className="mx-auto max-w-6xl px-6 pb-16 pt-8">{children}</main>
    </div>
  )
}

export default AppLayout
