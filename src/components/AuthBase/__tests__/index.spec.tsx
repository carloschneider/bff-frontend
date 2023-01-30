import { act, fireEvent, render, screen } from '@testing-library/react'

import AuthBase, { AuthBaseProps } from '..'

describe('<AuthBase />', () => {
  const mockedOnFinish = jest.fn()
  const mockedData: AuthBaseProps['data'] = {
    authStaff: {
      id: 'fake-id'
    }
  }

  it('should render component', () => {
    const { container } = render(
      <AuthBase onFinish={mockedOnFinish} data={null} loading={false} />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render loading element', () => {
    render(<AuthBase onFinish={mockedOnFinish} data={null} loading={true} />)

    const loading = screen.getByLabelText('loading')

    expect(loading).toBeInTheDocument()
  })

  it('should render alert after success login', () => {
    render(
      <AuthBase onFinish={mockedOnFinish} data={mockedData} loading={true} />
    )

    const alertMessage = screen.getByText(
      'We sent a login link to your e-mail.'
    )

    expect(alertMessage).toBeInTheDocument()
  })

  it('should show error when try login with a invalid email', async () => {
    render(<AuthBase onFinish={mockedOnFinish} data={null} loading={true} />)

    const inputEmail = await screen.getByPlaceholderText<HTMLInputElement>(
      'E-mail'
    )

    await act(() => {
      fireEvent.change(inputEmail, {
        target: {
          value: 'invalid@email'
        }
      })
    })

    const submit = screen.getByRole('button')

    await act(() => {
      fireEvent.click(submit)
    })

    const errorMessage = screen.getByText('Please input a valid e-mail')

    expect(errorMessage).toBeInTheDocument()
  })

  it('should show error when try to submit form with email empty', async () => {
    render(<AuthBase onFinish={mockedOnFinish} data={null} loading={true} />)

    const inputEmail = await screen.getByPlaceholderText<HTMLInputElement>(
      'E-mail'
    )

    await act(() => {
      fireEvent.change(inputEmail, {
        target: {
          value: '123'
        }
      })
    })

    await act(() => {
      fireEvent.change(inputEmail, {
        target: {
          value: ''
        }
      })
    })

    const submit = screen.getByRole('button')

    await act(() => {
      fireEvent.click(submit)
    })

    const errorMessage = screen.getByText('Please input your e-mail')

    expect(errorMessage).toBeInTheDocument()
  })
})
