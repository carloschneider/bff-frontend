import { MockedResponse } from '@apollo/react-testing'
import { act, fireEvent, screen } from '@testing-library/react'
import { App } from 'antd'
import { GraphQLError } from 'graphql'

import { renderWithApollo } from 'test-utils/render/renderWithApollo'

import {
  MUTATION_CHECKIN,
  CheckInDataType,
  MUTATION_CHECKOUT,
  CheckOutDataType
} from './graphql'

import PetActions from '.'

describe('<PetActions />', () => {
  const mockedId = '1'

  it('should render component', () => {
    const mockedCallback = jest.fn()

    const apolloResponseMock: MockedResponse<CheckInDataType>[] = [
      {
        request: {
          query: MUTATION_CHECKIN
        }
      }
    ]

    const { container } = renderWithApollo(
      <PetActions id={mockedId} name="fake name" callback={mockedCallback} />,
      apolloResponseMock
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  describe('Checkin', () => {
    it('should make checkin request', async () => {
      const mockedCallback = jest.fn()

      let called = false

      const apolloResponseMock: MockedResponse<CheckInDataType>[] = [
        {
          request: {
            query: MUTATION_CHECKIN,
            variables: {
              petId: mockedId
            }
          },
          result: () => {
            called = true

            return {
              data: {
                checkIn: [
                  {
                    id: 'fake-id'
                  }
                ]
              }
            }
          }
        }
      ]

      renderWithApollo(
        <PetActions id={mockedId} name="fake name" callback={mockedCallback} />,
        apolloResponseMock
      )

      const checkinButton = screen.getByRole('button', {
        name: /Checkin/
      })

      await act(async () => {
        await fireEvent.click(checkinButton)
      })

      const okButton = screen.getByRole('button', {
        name: /OK/
      })

      await act(async () => {
        await fireEvent.click(okButton)
      })

      expect(called).toBeTruthy()
      expect(mockedCallback).toHaveBeenCalled()
    })

    it('should throw error', async () => {
      const mockedCallback = jest.fn()

      let called = false

      const apolloResponseMock: MockedResponse<CheckInDataType>[] = [
        {
          request: {
            query: MUTATION_CHECKIN,
            variables: {
              petId: mockedId
            }
          },
          result: () => {
            called = true

            return {
              errors: [new GraphQLError('Mocked error message')]
            }
          }
        }
      ]

      renderWithApollo(
        <App>
          <PetActions id={mockedId} name="fake" callback={mockedCallback} />
        </App>,
        apolloResponseMock
      )

      const checkinButton = screen.getByRole('button', {
        name: /Checkin/
      })

      await act(async () => {
        await fireEvent.click(checkinButton)
      })

      const popupMessage = screen.getByText(
        'Are you sure you want to checkin fake?'
      )

      expect(popupMessage).toBeInTheDocument()

      const okButton = screen.getByRole('button', {
        name: /OK/
      })

      await act(async () => {
        await fireEvent.click(okButton)
      })

      expect(called).toBeTruthy()
      expect(mockedCallback).toHaveBeenCalled()

      const errorNotification = screen.getByText('Mocked error message')

      expect(errorNotification).toBeInTheDocument()
    })
  })

  describe('Checkout', () => {
    it('should make checkout request', async () => {
      const mockedCallback = jest.fn()

      let called = false

      const apolloResponseMock: MockedResponse<CheckOutDataType>[] = [
        {
          request: {
            query: MUTATION_CHECKOUT,
            variables: {
              petId: mockedId
            }
          },
          result: () => {
            called = true

            return {
              data: {
                checkOut: [
                  {
                    id: 'fake'
                  }
                ]
              }
            }
          }
        }
      ]

      renderWithApollo(
        <PetActions id={mockedId} name="fake name" callback={mockedCallback} />,
        apolloResponseMock
      )

      const checkoutButton = screen.getByRole('button', {
        name: /Checkout/
      })

      await act(async () => {
        await fireEvent.click(checkoutButton)
      })

      const okButton = screen.getByRole('button', {
        name: /OK/
      })

      await act(async () => {
        await fireEvent.click(okButton)
      })

      expect(called).toBeTruthy()
      expect(mockedCallback).toHaveBeenCalled()
    })

    it('should throw error', async () => {
      const mockedCallback = jest.fn()

      let called = false

      const apolloResponseMock: MockedResponse<CheckOutDataType>[] = [
        {
          request: {
            query: MUTATION_CHECKOUT,
            variables: {
              petId: mockedId
            }
          },
          result: () => {
            called = true

            return {
              errors: [new GraphQLError('Mocked error message')]
            }
          }
        }
      ]

      renderWithApollo(
        <App>
          <PetActions id={mockedId} name="fake" callback={mockedCallback} />
        </App>,
        apolloResponseMock
      )

      const checkoutButton = screen.getByRole('button', {
        name: /Checkout/
      })

      await act(async () => {
        await fireEvent.click(checkoutButton)
      })

      const popupMessage = screen.getByText(
        'Are you sure you want to checkout fake?'
      )

      expect(popupMessage).toBeInTheDocument()

      const okButton = screen.getByRole('button', {
        name: /OK/
      })

      await act(async () => {
        await fireEvent.click(okButton)
      })

      expect(called).toBeTruthy()
      expect(mockedCallback).toHaveBeenCalled()

      const errorNotification = screen.getByText('Mocked error message')

      expect(errorNotification).toBeInTheDocument()
    })
  })
})
