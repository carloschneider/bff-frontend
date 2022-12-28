import PageIndex from 'pages/Index'
import PagePets from 'pages/Pets'
import { Routes, Route, Outlet } from 'react-router-dom'
import TemplateHome from 'templates/Home'

import PageAuthByLink from 'pages/Auth/ByLink'
import PageLoginStaff from 'pages/Auth/Staff'
import PageDashboard from 'pages/Dashboard'
import PageHome from 'pages/Home'
import PageInvoices from 'pages/Invoices'
import PageLogout from 'pages/Logout'
import TemplateLogin from 'templates/Login'
import TemplatePanel from 'templates/Panel'

const Router = () => (
  <Routes>
    <Route path="/" element={<TemplateHome Outlet={<Outlet />} />}>
      <Route index element={<PageIndex />} />
    </Route>

    <Route path="/admin" element={<TemplatePanel Outlet={<Outlet />} />}>
      <Route index element={<PageHome />} />
      <Route path="/admin/dashboard" element={<PageDashboard />} />
      <Route path="/admin/invoices" element={<PageInvoices />} />
      <Route path="/admin/pets" element={<PagePets />} />
      <Route path="/admin/logout" element={<PageLogout />} />
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
