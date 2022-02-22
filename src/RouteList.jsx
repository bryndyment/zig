import { Route, Routes } from 'react-router-dom'
import { Zig } from './pages/Zig'

// local constants

const routes = {
  zig: '/'
}

// exported components

export const RouteList = () => (
  <Routes>
    <Route element={<Zig />} path={routes.zig} />
  </Routes>
)
