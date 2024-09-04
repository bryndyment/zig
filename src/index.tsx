import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App } from './pages/App'
import { theme } from './theme'

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
