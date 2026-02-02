import AppLayout from '@/layouts/AppLayout'
import DocumentsPage from '@/pages/Documents'
import HomePage from '@/pages/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocumentsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App
