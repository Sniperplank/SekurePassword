import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import InitialPopup from './pages/InitialPopup'
import AddRecord from './pages/AddRecord'
import RecordsList from './pages/RecordsList'
import RecordDetails from './pages/RecordDetails'


function App() {

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
