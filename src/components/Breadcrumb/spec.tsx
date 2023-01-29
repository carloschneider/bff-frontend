import { act, fireEvent, render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'

import { mockedRouter, mockedRoutes } from 'test-utils/routes'

jest.mock('router', () => ({
  routes: jest.fn().mockImplementation(() => mockedRoutes)
}))

describe('<Breadcrumb />', () => {
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
