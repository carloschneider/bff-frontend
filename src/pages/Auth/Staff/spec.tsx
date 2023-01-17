import { MockedResponse } from '@apollo/react-testing'
import { act, fireEvent, screen } from '@testing-library/react'
import { GraphQLError } from 'graphql'

import { renderWithApollo } from 'test-utils/render/renderWithApollo'

import { MUTATION_AUTH } from './graphql'

import PageLoginStaff from '.'

const mockedCompany = 'fake-company'
const mockedEmail = 'test@email.com'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    company: mockedCompany
  })
}))

describe('<PageLoginStaff />', () => {
  it('should render component', () => {
    const { container } = renderWithApollo(<PageLoginStaff />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should login', async () => {
    const apolloResponseMock: MockedResponse[] = [
      {
        request: {
          query: MUTATION_AUTH,
          variables: {
            input: {
              email: mockedEmail,
              company: mockedCompany
            }
          }
        },
        result: () => {
          return {
            data: {
              authStaff: {
                id: 'fake-id'
              }
            }
          }
        }
      }
    ]

    renderWithApollo(<PageLoginStaff />, apolloResponseMock)

    const inputEmail = await screen.getByPlaceholderText<HTMLInputElement>(
      'E-mail'
    )

    await act(async () => {
      await fireEvent.change(inputEmail, {
        target: {
          value: mockedEmail
        }
      })
    })

    expect(inputEmail.value).toBe(mockedEmail)

    const submit = screen.getByRole('button')

    await act(async () => {
      await fireEvent.click(submit)
    })

    const successMessage = screen.getByText(
      'We sent a login link to your e-mail.'
    )

    expect(successMessage).toBeInTheDocument()
  })

  it('should show error when try login with a invalid email', async () => {
    renderWithApollo(<PageLoginStaff />)

    const inputEmail = await screen.getByPlaceholderText<HTMLInputElement>(
      'E-mail'
    )

    await act(async () => {
      await fireEvent.change(inputEmail, {
        target: {
          value: 'invalid@email'
        }
      })
    })

    const submit = screen.getByRole('button')

    await act(async () => {
      await fireEvent.click(submit)
    })

    const errorMessage = screen.getByText('Please input a valid e-mail')

    expect(errorMessage).toBeInTheDocument()
  })

  it('should show error when try to submit form with email empty', async () => {
    renderWithApollo(<PageLoginStaff />)

    const inputEmail = await screen.getByPlaceholderText<HTMLInputElement>(
      'E-mail'
    )

    await act(async () => {
      await fireEvent.change(inputEmail, {
        target: {
          value: '123'
        }
      })
    })

    await act(async () => {
      await fireEvent.change(inputEmail, {
        target: {
          value: ''
        }
      })
    })

    const submit = screen.getByRole('button')

    await act(async () => {
      await fireEvent.click(submit)
    })

    const errorMessage = screen.getByText('Please input your e-mail')

    expect(errorMessage).toBeInTheDocument()
  })

  it('should return error and show notification', async () => {
    const apolloErrorResponseMock: MockedResponse[] = [
      {
        request: {
          query: MUTATION_AUTH,
          variables: {
            input: {
              email: mockedEmail,
              company: mockedCompany
            }
          }
        },
        result: {
          errors: [new GraphQLError('Mocked error message')]
        }
      }
    ]

    renderWithApollo(<PageLoginStaff />, apolloErrorResponseMock)

    const inputEmail = await screen.getByPlaceholderText<HTMLInputElement>(
      'E-mail'
    )

    await act(async () => {
      await fireEvent.change(inputEmail, {
        target: {
          value: mockedEmail
        }
      })
    })

    expect(inputEmail.value).toBe(mockedEmail)

    const submit = screen.getByRole('button')

    await act(async () => {
      await fireEvent.click(submit)
    })

    const errorNotification = screen.getByText('Mocked error message')

    expect(errorNotification).toBeInTheDocument()
  })
})
