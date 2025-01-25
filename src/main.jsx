import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import { AuthProvider } from './contexts/AuthContext'
import { RecordsProvider } from './contexts/RecordsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <RecordsProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </RecordsProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
