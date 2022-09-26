import { App } from './pages/App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { theme } from './theme'
import React from 'react'

createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route element={<App />} path="/" />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
