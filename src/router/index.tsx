import { Routes, Route, Outlet } from 'react-router-dom'

import PageAuthByLink from 'pages/Auth/ByLink'
import PageLoginStaff from 'pages/Auth/Staff'
import PageDashboard from 'pages/Dashboard'
import PageHome from 'pages/Home'
import PageIndex from 'pages/Index'
import PageInvoices from 'pages/Invoices'
import PageLogout from 'pages/Logout'
import PagePet from 'pages/Pet'
import PagePets from 'pages/Pets'
import TemplateHome from 'templates/Home'
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
      <Route path="/admin/pet/:petId" element={<PagePet />} />
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
