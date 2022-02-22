import { HomePage } from './pages/Home'
import { Route, Routes } from 'react-router-dom'

// local constants

const routes = {
  home: '/'
}

// exported components

export const RouteList = () => (
  <Routes>
    <Route element={<HomePage />} path={routes.home} />
  </Routes>
)
