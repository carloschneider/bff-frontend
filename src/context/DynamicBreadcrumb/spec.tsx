import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'

import DynamicBreadcrumbProvider, { useDynamicBreadcrumbContext } from '.'

describe('<DynamicBreadcrumb />', () => {
  const MockedComponent = () => {
    const { title, setTitle } = useDynamicBreadcrumbContext()

    useEffect(() => {
      setTitle('hello world')
    }, [])

    return <h1>{title}</h1>
  }

  it('should not render and throw a error', () => {
    const originalError = console.error
    console.error = jest.fn()

    expect(() => render(<MockedComponent />)).toThrow(
      'useDynamicBreadcrumbContext must be inside of <DynamicBreadcrumbProvider>'
    )

    expect(console.error).toHaveBeenCalled()

    console.error = originalError
  })

  it('should render component', async () => {
    const { container } = render(
      <DynamicBreadcrumbProvider>
        <MockedComponent />
      </DynamicBreadcrumbProvider>
    )

    const title = screen.getByRole('heading', {
      name: /hello world/
    })

    expect(title).toBeInTheDocument()
    expect(container.firstChild).toMatchSnapshot()
  })
})
