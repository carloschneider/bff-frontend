import { Routes, Route, Outlet } from 'react-router-dom'

import PageAuthByLink from 'pages/Auth/ByLink'
import PageLoginStaff from 'pages/Auth/Staff'
import PageDashboard from 'pages/Dashboard'
import PageInvoices from 'pages/Invoices'
import TemplateLogin from 'templates/Login'
import TemplatePanel from 'templates/Panel'

const Router = () => (
  <Routes>
    <Route path="/" element={<TemplatePanel Outlet={<Outlet />} />}>
      <Route index element={<PageDashboard />} />
      <Route path="/invoices" element={<PageInvoices />} />
    </Route>

    <Route path="auth" element={<TemplateLogin Outlet={<Outlet />} />}>
      <Route path=":company">
        <Route path="staff" index element={<PageLoginStaff />} />
      </Route>

      <Route path="key/:key" element={<PageAuthByLink />} />
    </Route>
  </Routes>
)

export default Router
