import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RouteList } from './RouteList'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteList />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
