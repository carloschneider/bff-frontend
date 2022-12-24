import { Routes, Route, Outlet } from 'react-router-dom'

import PageLoginStaff from 'pages/Auth/Staff'
import TemplateLogin from 'templates/Login'

const Router = () => (
  <Routes>
    <Route path="auth" element={<TemplateLogin Outlet={<Outlet />} />}>
      <Route path="staff">
        <Route index element={<PageLoginStaff />} />
      </Route>
    </Route>
  </Routes>
)

export default Router
