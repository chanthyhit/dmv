import { useState } from 'react'
import AppLayout from '@/layouts/AppLayout'
import DocumentsPage from '@/pages/Documents'
import HomePage from '@/pages/HomePage'

const App = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'docs'>('docs')

  const renderPage = currentPage === 'docs' ? <DocumentsPage /> : <HomePage />

  return (
    <AppLayout currentPage={currentPage} onNavigate={(page) => setCurrentPage(page)}>
      {renderPage}
    </AppLayout>
  )
}

export default App
