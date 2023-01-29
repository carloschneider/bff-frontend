import { MockedResponse } from '@apollo/react-testing'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'

import { OrderEnum } from 'helpers/pagination/order'
import { renderWithApollo } from 'test-utils/render/renderWithApollo'

import PetChecksTable from '..'
import {
  getAllChecksByPetId,
  getAllChecksByPetIdPageTwo
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
            getAllChecksByPetId
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
            getAllChecksByPetId: getAllChecksByPetIdPageTwo
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
      getAllChecksByPetId[0].arrive
    ).toLocaleString('pt-BR', { hourCycle: 'h23' })

    const mockedCheckinMemberName = `${getAllChecksByPetId[0].responsibles[0].staff?.firstName} ${getAllChecksByPetId[0].responsibles[0].staff?.lastName}`

    const staffMember = await screen.findByText(
      `${mockedCheckinDate} (${mockedCheckinMemberName})`
    )

    expect(staffMember).toBeInTheDocument()
  })

  it('should change pagination page', async () => {
    renderWithApollo(
      <PetChecksTable id={mockedPetId} name={mockedPetName} />,
      apolloResponseMock
    )

    const mockedCheckinDate = new Date(
      getAllChecksByPetId[0].arrive
    ).toLocaleString('pt-BR', { hourCycle: 'h23' })

    const mockedCheckinMemberName = `${getAllChecksByPetId[0].responsibles[0].staff?.firstName} ${getAllChecksByPetId[0].responsibles[0].staff?.lastName}`

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
      getAllChecksByPetIdPageTwo[0].arrive
    ).toLocaleString('pt-BR', { hourCycle: 'h23' })

    const mockedCheckinMemberNamePageTwo = `${getAllChecksByPetIdPageTwo[0].responsibles[0].staff?.firstName} ${getAllChecksByPetIdPageTwo[0].responsibles[0].staff?.lastName}`

    const staffMemberPageTwo = await screen.findByText(
      `${mockedCheckinDatePageTwo} (${mockedCheckinMemberNamePageTwo})`
    )

    expect(staffMemberPageTwo).toBeInTheDocument()
  })
})
