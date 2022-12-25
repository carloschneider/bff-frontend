import { Routes, Route, Outlet } from 'react-router-dom'

import PageAuthByLink from 'pages/Auth/ByLink'
import PageLoginStaff from 'pages/Auth/Staff'
import TemplateLogin from 'templates/Login'

const Router = () => (
  <Routes>
    <Route path="auth" element={<TemplateLogin Outlet={<Outlet />} />}>
      <Route path=":company">
        <Route path="staff" index element={<PageLoginStaff />} />
      </Route>

      <Route path="key/:key" element={<PageAuthByLink />} />
    </Route>
  </Routes>
)

export default Router
