import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route
} from 'react-router-dom'

import Breadcrumb from 'components/Breadcrumb'
import DynamicBreadcrumbProvider from 'context/DynamicBreadcrumb'

type MockedTemplateProps = {
  Outlet: React.ReactNode
}

const MockedTemplate = ({ Outlet }: MockedTemplateProps) => (
  <DynamicBreadcrumbProvider>
    <Breadcrumb />

    <div>{Outlet}</div>
  </DynamicBreadcrumbProvider>
)

export const mockedRoutes = () => (
  <Route path="/" element={<MockedTemplate Outlet={<Outlet />} />}>
    <Route
      index
      element={
        <>
          <h1>Index</h1>
          <Link to="/admin">Go to admin page</Link>
          <Link to="/admin/internal">Go to admin internal</Link>
        </>
      }
    />

    <Route path="/admin" element={<h1>Admin</h1>} />

    <Route path="/admin/internal" element={<h1>Admin Internal</h1>} />
  </Route>
)

export const mockedRouter = createBrowserRouter(
  createRoutesFromElements(mockedRoutes())
)
