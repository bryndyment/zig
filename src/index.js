import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { RouteList } from './RouteList'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <RouteList />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
