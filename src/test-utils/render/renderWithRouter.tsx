import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

export const renderWithRouter = (children: ReactNode | undefined) => {
  const routes = () => (
    <Route>
      <Route path="/" element={children} />
      <Route path="/admin" element={children} />
    </Route>
  )

  return render(
    <RouterProvider
      router={createBrowserRouter(createRoutesFromElements(routes()))}
    />
  )
}
