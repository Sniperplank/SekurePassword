import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import InitialPopup from './pages/InitialPopup'
import AddRecord from './pages/AddRecord'
import RecordsList from './pages/RecordsList'
import RecordDetails from './pages/RecordDetails'
import { useAuth } from './contexts/AuthContext'
import { useEffect } from 'react'


function App() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // <--------------------------UNCOMMENT WHEN READY FOR BUILD ------------------------------------------------------------------------------------->
  useEffect(() => {
    chrome.storage.local.get("profile", (result) => {
      if (chrome.runtime.lastError) {
        console.error('Failed to fetch profile:', chrome.runtime.lastError.message)
      } else {
        setUser(result.profile || null)
      }
    })
  }, [location])

  return (
    <Routes>
      <Route path='/' element={<InitialPopup />} />
      <Route path='/add' element={<AddRecord />} />
      <Route path='/list' element={<RecordsList />} />
      <Route path='/details' element={<RecordDetails />} />
    </Routes>
  )
}

export default App
