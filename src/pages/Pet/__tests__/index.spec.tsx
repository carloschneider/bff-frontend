import { MockedResponse } from '@apollo/react-testing'
import { act, screen } from '@testing-library/react'
import { App } from 'antd'
import { GraphQLError } from 'graphql'
import { useParams, useNavigate } from 'react-router-dom'

import { useDynamicBreadcrumbContext } from 'context/DynamicBreadcrumb'
import { renderWithApollo } from 'test-utils/render/renderWithApollo'

import PagePet from '..'
import { getPetByIdFixture } from '../__fixtures__'
import { GET_PET_BY_ID, PetDataType } from '../graphql'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn()
}))

jest.mock('context/DynamicBreadcrumb', () => ({
  ...jest.requireActual('context/DynamicBreadcrumb'),
  useDynamicBreadcrumbContext: jest.fn()
}))

describe('<PagePet />', () => {
  const apolloResponseMock: MockedResponse<PetDataType>[] = [
    {
      request: {
        query: GET_PET_BY_ID,
        variables: {
          petId: '1'
        }
      },
      result: {
        data: {
          getPetById: getPetByIdFixture
        }
      }
    }
  ]

  it('should render component', async () => {
    const mockedNavigate = jest.fn()
    const mockedSetTitle = jest.fn()

    ;(useParams as jest.Mock).mockImplementation(() => ({ petId: '1' }))
    ;(useNavigate as jest.Mock).mockImplementation(() => mockedNavigate)
    ;(useDynamicBreadcrumbContext as jest.Mock).mockImplementation(() => ({
      setTitle: mockedSetTitle
    }))

    const { container } = renderWithApollo(
      <App>
        <PagePet />
      </App>,
      apolloResponseMock
    )

    await act(() => new Promise((resolve) => setTimeout(resolve, 100)))

    expect(mockedSetTitle).toHaveBeenCalled()

    const phoneNumber = await screen.findByText('(99) 99999-9999')
    expect(phoneNumber).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should redirect user to /admin/pets when petId is empty', () => {
    const mockedNavigate = jest.fn()
    const mockedSetTitle = jest.fn()

    ;(useParams as jest.Mock).mockImplementation(() => ({ petId: null }))
    ;(useNavigate as jest.Mock).mockImplementation(() => mockedNavigate)
    ;(useDynamicBreadcrumbContext as jest.Mock).mockImplementation(() => ({
      setTitle: mockedSetTitle
    }))

    renderWithApollo(
      <App>
        <PagePet />
      </App>,
      apolloResponseMock
    )

    expect(mockedNavigate).toHaveBeenCalledWith('/admin/pets')
  })

  it('should show notification error', async () => {
    const apolloResponseMock: MockedResponse<PetDataType>[] = [
      {
        request: {
          query: GET_PET_BY_ID,
          variables: {
            petId: '1'
          }
        },
        result: {
          errors: [new GraphQLError('Mocked error message')]
        }
      }
    ]

    const mockedNavigate = jest.fn()
    const mockedSetTitle = jest.fn()

    ;(useParams as jest.Mock).mockImplementation(() => ({ petId: '1' }))
    ;(useNavigate as jest.Mock).mockImplementation(() => mockedNavigate)
    ;(useDynamicBreadcrumbContext as jest.Mock).mockImplementation(() => ({
      setTitle: mockedSetTitle
    }))

    renderWithApollo(
      <App>
        <PagePet />
      </App>,
      apolloResponseMock
    )

    const phoneNumber = await screen.findByText('Mocked error message')
    expect(phoneNumber).toBeInTheDocument()
  })
})
