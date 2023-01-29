import { act, fireEvent } from '@testing-library/react'
import { Grid } from 'antd'
import { Link } from 'react-router-dom'

import { renderWithRouter } from 'test-utils/render/renderWithRouter'

import Sidebar from '.'

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Grid: {
    useBreakpoint: jest.fn()
  }
}))

describe('<Sidebar />', () => {
  const mockedSetMenuCollapsed = jest.fn()

  it('should render component', async () => {
    document.cookie = 'role="STAFF"'
    ;(Grid.useBreakpoint as jest.Mock).mockReturnValueOnce({ lg: false })

    const { baseElement } = renderWithRouter(
      <Sidebar collapsed={true} setMenuCollapsed={mockedSetMenuCollapsed} />
    )

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)))

    expect(baseElement.querySelector('.ant-drawer')).toBeInTheDocument()

    expect(baseElement).toMatchSnapshot()
  })

  it('should render Drawer', async () => {
    document.cookie = 'role="STAFF"'
    ;(Grid.useBreakpoint as jest.Mock).mockReturnValueOnce({ lg: false })

    const { baseElement } = renderWithRouter(
      <Sidebar collapsed={true} setMenuCollapsed={mockedSetMenuCollapsed} />
    )

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)))

    const drawer = baseElement.querySelector('.ant-drawer')

    expect(drawer).toBeInTheDocument()

    const drawerMask = baseElement.querySelector('.ant-drawer-mask')

    if (drawerMask) {
      fireEvent.click(drawerMask)
    }

    expect(mockedSetMenuCollapsed).toHaveBeenCalled()
    expect(mockedSetMenuCollapsed.mock.calls[0][0](true)).toEqual(false)
    expect(mockedSetMenuCollapsed.mock.calls[0][0](false)).toEqual(true)
  })

  it('should render with Sider', async () => {
    document.cookie = 'role="STAFF"'
    ;(Grid.useBreakpoint as jest.Mock).mockReturnValueOnce({ lg: true })

    const { baseElement } = renderWithRouter(
      <>
        <Sidebar collapsed={true} setMenuCollapsed={mockedSetMenuCollapsed} />
        <Link to="/admin">Go to admin</Link>
      </>
    )

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)))

    const sider = baseElement.querySelector('.ant-layout-sider')

    expect(sider).toBeInTheDocument()
  })
})
