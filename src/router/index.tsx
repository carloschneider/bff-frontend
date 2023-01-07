import { Spin } from 'antd'
import { useContext } from 'react'
import {
  Outlet,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import { Route } from 'use-react-router-breadcrumbs'

import { DynamicBreadcrumbContext } from 'context/DyanmicBreadcrumbContext'
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

const DyanmicBreadcrumbTitle = () => {
  const { title } = useContext(DynamicBreadcrumbContext)

  return <span>{title ? title : <Spin size="small" />}</span>
}

export const routes = () => (
  <Route>
    <Route path="/" element={<TemplateHome Outlet={<Outlet />} />}>
      <Route index element={<PageIndex />} />
    </Route>

    <Route path="/admin" element={<TemplatePanel Outlet={<Outlet />} />}>
      <Route index element={<PageHome />} />
      <Route path="/admin/dashboard" element={<PageDashboard />} />
      <Route path="/admin/invoices" element={<PageInvoices />} />
      <Route path="/admin/pets">
        <Route index element={<PagePets />} />

        <Route
          path="/admin/pets/:petId"
          breadcrumb={DyanmicBreadcrumbTitle}
          element={<PagePet />}
        />
      </Route>
      <Route path="/admin/logout" element={<PageLogout />} />
    </Route>

    <Route path="/auth" element={<TemplateLogin Outlet={<Outlet />} />}>
      <Route path="/auth/:company/staff" element={<PageLoginStaff />} />

      <Route path="/auth/key/:key" element={<PageAuthByLink />} />
    </Route>
  </Route>
)

const router = createBrowserRouter(createRoutesFromElements(routes()))

export default router
