import { MockedResponse } from '@apollo/react-testing'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'

import { OrderEnum } from 'helpers/pagination/order'
import { renderWithApollo } from 'test-utils/render/renderWithApollo'

import PetChecksTable from '..'
import {
  getAllChecksByPetIdFixture,
  getAllChecksByPetIdPageTwoFixture
} from '../__fixtures__'
import { ChecksDataType, GET_CHECKS_BY_PET_ID } from '../graphql'

describe('<PetChecksTable />', () => {
  const mockedPetId = '1'
  const mockedPetName = 'Nice Puppy'
  const apolloResponseMock: MockedResponse<ChecksDataType>[] = [
    {
      request: {
        query: GET_CHECKS_BY_PET_ID,
        variables: {
          order: OrderEnum.DESC,
          field: 'createdAt',
          limit: 4,
          offset: 0,
          where: {
            id: mockedPetId
          }
        }
      },
      result: () => {
        return {
          data: {
            getAllChecksByPetId: getAllChecksByPetIdFixture
          }
        }
      }
    },
    {
      request: {
        query: GET_CHECKS_BY_PET_ID,
        variables: {
          order: OrderEnum.DESC,
          field: 'createdAt',
          limit: 4,
          offset: 4,
          where: {
            id: mockedPetId
          }
        }
      },
      result: () => {
        return {
          data: {
            getAllChecksByPetId: getAllChecksByPetIdPageTwoFixture
          }
        }
      }
    }
  ]

  it('should render component', async () => {
    const { container } = renderWithApollo(
      <PetChecksTable id={mockedPetId} name={mockedPetName} />,
      apolloResponseMock
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should load inital data', async () => {
    const { container } = renderWithApollo(
      <PetChecksTable id={mockedPetId} name={mockedPetName} />,
      apolloResponseMock
    )

    await waitFor(() => {
      expect(
        container.querySelector('.ant-spin.ant-spin-spinning')
      ).toBeInTheDocument()
    })

    const mockedCheckinDate = new Date(
      getAllChecksByPetIdFixture[0].arrive
    ).toLocaleString('pt-BR', { hourCycle: 'h23' })

    const mockedCheckinMemberName = `${getAllChecksByPetIdFixture[0].responsibles[0].staff?.firstName} ${getAllChecksByPetIdFixture[0].responsibles[0].staff?.lastName}`

    const staffMember = await screen.findByText(
      `${mockedCheckinDate} (${mockedCheckinMemberName})`
    )

    expect(staffMember).toBeInTheDocument()
  })

  it('should change pagination page', async () => {
    document.cookie = 'role="STAFF"'

    renderWithApollo(
      <PetChecksTable id={mockedPetId} name={mockedPetName} />,
      apolloResponseMock
    )

    const mockedCheckinDate = new Date(
      getAllChecksByPetIdFixture[0].arrive
    ).toLocaleString('pt-BR', { hourCycle: 'h23' })

    const mockedCheckinMemberName = `${getAllChecksByPetIdFixture[0].responsibles[0].staff?.firstName} ${getAllChecksByPetIdFixture[0].responsibles[0].staff?.lastName}`

    const staffMember = await screen.findByText(
      `${mockedCheckinDate} (${mockedCheckinMemberName})`
    )

    expect(staffMember).toBeInTheDocument()

    const nextPageButton = screen.getByRole('button', {
      name: /right/
    })

    await act(async () => {
      await fireEvent.click(nextPageButton)
    })

    const mockedCheckinDatePageTwo = new Date(
      getAllChecksByPetIdPageTwoFixture[0].arrive
    ).toLocaleString('pt-BR', { hourCycle: 'h23' })

    const mockedCheckinMemberNamePageTwo = `${getAllChecksByPetIdPageTwoFixture[0].responsibles[0].staff?.firstName} ${getAllChecksByPetIdPageTwoFixture[0].responsibles[0].staff?.lastName}`

    const staffMemberPageTwo = await screen.findByText(
      `${mockedCheckinDatePageTwo} (${mockedCheckinMemberNamePageTwo})`
    )

    expect(staffMemberPageTwo).toBeInTheDocument()
  })

  it('should not show pagination', () => {
    const apolloResponseMockEmpty: MockedResponse<ChecksDataType>[] = [
      {
        request: {
          query: GET_CHECKS_BY_PET_ID,
          variables: {
            order: OrderEnum.DESC,
            field: 'createdAt',
            limit: 4,
            offset: 0,
            where: {
              id: mockedPetId
            }
          }
        },
        result: () => {
          return {
            data: {
              getAllChecksByPetId: []
            }
          }
        }
      }
    ]

    renderWithApollo(
      <PetChecksTable id={mockedPetId} name={mockedPetName} />,
      apolloResponseMockEmpty
    )

    const nextPageButton = screen.queryByRole('button', { name: /right/ })

    expect(nextPageButton).not.toBeInTheDocument()
  })
})
