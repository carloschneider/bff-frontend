import { MockedResponse } from '@apollo/react-testing'
import { act, fireEvent, screen, within } from '@testing-library/react'
import { App } from 'antd'
import { GraphQLError } from 'graphql'

import { OrderEnum } from 'helpers/pagination/order'
import { renderWithApollo } from 'test-utils/render/renderWithApollo'

import PagePets from '..'
import {
  getAllPetsFixture,
  getAllPetsOrderFixture,
  getAllPetsPaginationFixture,
  getAllPetsPaginationPageTwoFixture,
  getAllPetsSearchResultFixture
} from '../__fixtures__'
import { PetsDataType, QUERY_GET_ALL_PETS } from '../graphql'

jest.mock('react-router-dom', () => ({
  Link: ({ children }: React.PropsWithChildren<Record<never, never>>) =>
    children
}))

jest.mock('constants/pagination', () => ({
  ...jest.requireActual('constants/pagination'),
  PAGINATION_DEFAULT_LIMIT: 2
}))

describe('<PagePets />', () => {
  const initialRequest = {
    request: {
      query: QUERY_GET_ALL_PETS,
      variables: {
        order: OrderEnum.DESC,
        field: 'createdAt',
        limit: 2,
        offset: 0,
        where: null
      }
    },
    result: {
      data: {
        getAllPets: getAllPetsFixture
      }
    }
  }

  const apolloResponseMock: MockedResponse<PetsDataType>[] = [initialRequest]

  it('should render component', async () => {
    const { container } = renderWithApollo(
      <App>
        <PagePets />
      </App>,
      apolloResponseMock
    )

    const petName = await screen.findByText('Fake Pet Name 1')
    expect(petName).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should search a pet', async () => {
    const mockedSearch = 'search pet'
    const apolloResponseMockSearch: MockedResponse<PetsDataType>[] = [
      initialRequest,
      {
        request: {
          query: QUERY_GET_ALL_PETS,
          variables: {
            order: OrderEnum.DESC,
            field: 'createdAt',
            limit: 2,
            offset: 0,
            where: {
              name: mockedSearch
            }
          }
        },
        result: {
          data: {
            getAllPets: getAllPetsSearchResultFixture
          }
        }
      },
      initialRequest
    ]

    renderWithApollo(
      <App>
        <PagePets />
      </App>,
      apolloResponseMockSearch
    )

    let petName = await screen.findByText('Fake Pet Name 1')
    expect(petName).toBeInTheDocument()

    let searchInput = screen.getByPlaceholderText('Search by pet name')

    await fireEvent.change(searchInput, {
      target: {
        value: mockedSearch
      }
    })

    const resultPetName = await screen.findByText(mockedSearch)
    expect(resultPetName).toBeInTheDocument()

    searchInput = screen.getByPlaceholderText('Search by pet name')

    await fireEvent.change(searchInput, {
      target: {
        value: ''
      }
    })

    petName = await screen.findByText('Fake Pet Name 1')
    expect(petName).toBeInTheDocument()
  })

  it('should sort data when click in a column', async () => {
    const apolloResponseMockSort: MockedResponse<PetsDataType>[] = [
      initialRequest,
      {
        request: {
          query: QUERY_GET_ALL_PETS,
          variables: {
            order: OrderEnum.ASC,
            field: 'createdAt',
            limit: 2,
            offset: 0,
            where: null
          }
        },
        result: {
          data: {
            getAllPets: getAllPetsOrderFixture
          }
        }
      }
    ]

    const { baseElement } = renderWithApollo(
      <App>
        <PagePets />
      </App>,
      apolloResponseMockSort
    )

    let petName = await screen.findByText('Fake Pet Name 1')
    expect(petName).toBeInTheDocument()

    const rowsBeforeSort =
      baseElement.querySelectorAll<HTMLElement>('.ant-table-row')

    expect(
      within(rowsBeforeSort[0]).getByText('Fake Pet Name 1')
    ).toBeInTheDocument()
    expect(
      within(rowsBeforeSort[1]).getByText('Fake Pet Name 2')
    ).toBeInTheDocument()

    const sorter = baseElement.querySelector('.ant-table-column-sort')

    if (sorter) {
      await fireEvent.click(sorter)
    }

    petName = await screen.findByText('Fake Pet Name 1')
    expect(petName).toBeInTheDocument()

    const rowsAfterSort =
      baseElement.querySelectorAll<HTMLElement>('.ant-table-row')

    expect(
      within(rowsAfterSort[0]).getByText('Fake Pet Name 2')
    ).toBeInTheDocument()
    expect(
      within(rowsAfterSort[1]).getByText('Fake Pet Name 1')
    ).toBeInTheDocument()
  })

  it('should change pagination page', async () => {
    const apolloResponseMockPagination: MockedResponse<PetsDataType>[] = [
      {
        request: {
          query: QUERY_GET_ALL_PETS,
          variables: {
            order: OrderEnum.DESC,
            field: 'createdAt',
            limit: 2,
            offset: 0,
            where: null
          }
        },
        result: {
          data: {
            getAllPets: getAllPetsPaginationFixture
          }
        }
      },
      {
        request: {
          query: QUERY_GET_ALL_PETS,
          variables: {
            order: OrderEnum.DESC,
            field: 'createdAt',
            limit: 2,
            offset: 2,
            where: null
          }
        },
        result: {
          data: {
            getAllPets: getAllPetsPaginationPageTwoFixture
          }
        }
      }
    ]

    renderWithApollo(
      <App>
        <PagePets />
      </App>,
      apolloResponseMockPagination
    )

    const petName = await screen.findByText('Fake Pet Name 1')
    expect(petName).toBeInTheDocument()

    const nextPageButton = screen.getByRole('button', {
      name: /right/
    })

    await fireEvent.click(nextPageButton)

    const petNameNextPage = await screen.findByText('Fake Pet Name 3')
    expect(petNameNextPage).toBeInTheDocument()
  })

  it('should show a error message', async () => {
    const apolloResponseMockError: MockedResponse<PetsDataType>[] = [
      {
        request: {
          query: QUERY_GET_ALL_PETS,
          variables: {
            order: OrderEnum.DESC,
            field: 'createdAt',
            limit: 2,
            offset: 0,
            where: null
          }
        },
        result: {
          errors: [new GraphQLError('Mocked error message')]
        }
      }
    ]

    renderWithApollo(
      <App>
        <PagePets />
      </App>,
      apolloResponseMockError
    )

    await act(() => new Promise((done) => setTimeout(done, 100)))

    const errorMessage = screen.getByText('Mocked error message')

    expect(errorMessage).toBeInTheDocument()
  })
})
