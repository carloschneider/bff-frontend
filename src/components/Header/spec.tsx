import { act, fireEvent, render, screen } from '@testing-library/react'

import Header from '.'

describe('<Header />', () => {
  it('should render component', () => {
    const { container } = render(<Header setMenuCollapsed={(_) => _} />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should call setMenuCollapsed', async () => {
    const mockedSetMenuCollapsed = jest.fn()

    render(<Header setMenuCollapsed={mockedSetMenuCollapsed} />)

    const button = screen.getByRole('button')

    await act(async () => {
      await fireEvent.click(button)
    })

    expect(mockedSetMenuCollapsed).toHaveBeenCalled()
    expect(mockedSetMenuCollapsed.mock.calls[0][0](true)).toEqual(false)
    expect(mockedSetMenuCollapsed.mock.calls[0][0](false)).toEqual(true)
  })
})
