import { MockedResponse } from '@apollo/react-testing'
import { act, screen } from '@testing-library/react'
import { GraphQLError } from 'graphql'
import MockDate from 'mockdate'

import { COOKIE_EXPIRES } from 'constants/cookie'
import { renderWithApollo } from 'test-utils/render/renderWithApollo'

import PageAuthByLink from '..'
import { MUTATION_AUTH_BY_KEY } from '../graphql'

const mockedUseNavigate = jest.fn()
const mockedKey = 'fake-key'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
  useParams: () => ({
    key: mockedKey
  })
}))

const mockedCookieSet = jest.fn()

jest.mock('react-cookie', () => ({
  useCookies: () => {
    return [null, mockedCookieSet]
  }
}))

const mockedToken = 'fake-token'
const mockedRole = 'FAKE-ROLE'

describe('<PageAuthByLink />', () => {
  it('should render component', () => {
    const apolloResponseMock: MockedResponse[] = [
      {
        request: {
          query: MUTATION_AUTH_BY_KEY,
          variables: {
            input: {
              key: mockedKey
            }
          }
        },
        result: () => {
          return {
            data: {
              authByKey: {
                token: mockedToken,
                role: mockedRole
              }
            }
          }
        }
      }
    ]

    const { container } = renderWithApollo(
      <PageAuthByLink />,
      apolloResponseMock
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should redirect user', async () => {
    const mockedDateObject = new Date()

    MockDate.set(mockedDateObject)

    let called = false
    const apolloResponseMock: MockedResponse[] = [
      {
        request: {
          query: MUTATION_AUTH_BY_KEY,
          variables: {
            input: {
              key: mockedKey
            }
          }
        },
        result: () => {
          called = true

          return {
            data: {
              authByKey: {
                token: mockedToken,
                role: mockedRole
              }
            }
          }
        }
      }
    ]

    renderWithApollo(<PageAuthByLink />, apolloResponseMock)

    await act(() => new Promise((done) => setTimeout(done, 100)))

    expect(called).toBeTruthy()

    await act(() => new Promise((done) => setTimeout(done, 900)))

    const expires = new Date(mockedDateObject.getTime() + COOKIE_EXPIRES * 1000)

    const cookieOptions = {
      expires,
      path: '/'
    }

    expect(mockedCookieSet).toHaveBeenCalledWith(
      'token',
      mockedToken,
      cookieOptions
    )
    expect(mockedCookieSet).toHaveBeenCalledWith(
      'role',
      mockedRole,
      cookieOptions
    )
    expect(mockedUseNavigate).toBeCalled()

    MockDate.reset()
  })

  it('should show a error message', async () => {
    const apolloResponseMock: MockedResponse[] = [
      {
        request: {
          query: MUTATION_AUTH_BY_KEY,
          variables: {
            input: {
              key: mockedKey
            }
          }
        },
        result: {
          errors: [new GraphQLError('Mocked error message')]
        }
      }
    ]

    renderWithApollo(<PageAuthByLink />, apolloResponseMock)

    await act(() => new Promise((done) => setTimeout(done, 100)))

    const errorMessage = screen.getByText(
      'Something went wrong, please try again.'
    )

    expect(errorMessage).toBeInTheDocument()
  })
})
