import { act, fireEvent, render, screen } from '@testing-library/react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom'

import DynamicBreadcrumbProvider from 'context/DynamicBreadcrumb'

import Breadcrumb from '.'

type MockedTemplateProps = {
  Outlet: React.ReactNode
}

const MockedTemplate = ({ Outlet }: MockedTemplateProps) => (
  <DynamicBreadcrumbProvider>
    <Breadcrumb />

    <div>{Outlet}</div>
  </DynamicBreadcrumbProvider>
)

const mockedRoutes = () => (
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

jest.mock('router', () => ({
  routes: jest.fn().mockImplementation(() => mockedRoutes)
}))

describe('<Breadcrumb />', () => {
  const mockedRouter = createBrowserRouter(
    createRoutesFromElements(mockedRoutes())
  )

  it('should render component', async () => {
    const { container } = render(<RouterProvider router={mockedRouter} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should navigate to admin page and show page on breadcrumb', async () => {
    render(<RouterProvider router={mockedRouter} />)

    const link = screen.getByRole('link', {
      name: /Go to admin internal/
    })

    await act(async () => {
      await fireEvent.click(link)
    })

    const content = screen.getByRole('heading', {
      name: /Admin Internal/
    })

    expect(content).toBeInTheDocument()

    const breadCrumbInternalItem = screen.getByText('Internal', { exact: true })

    expect(breadCrumbInternalItem).toBeInTheDocument()
  })
})
