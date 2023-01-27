import { gql } from '@apollo/client'

import { PaginationType } from 'pages/Pets'

export type StaffType = {
  id: string
  firstName: string
  lastName: string
}

export type UserType = {
  id: string
  companyName: string
}

export type ResponsibleType = {
  id: string
  type: 'arrive' | 'leave'
  staff: StaffType | null
  user: UserType | null
}

export type CheckType = {
  id: string
  arrive: string
  leave: string | null
  count?: number | null
  responsibles: ResponsibleType[]
}

export type ChecksDataType = {
  getAllChecksByPetId: CheckType[] | undefined
}

type ChecksWhereType = {
  id?: string
}

export type ChecksVariablesType = {
  where?: ChecksWhereType | null
} & PaginationType

export const GET_CHECKS_BY_PET_ID = gql`
  query GetAllChecksByPetId(
    $limit: Int
    $offset: Int
    $field: String
    $order: String
    $where: CheckWhereGetAllByPetIdInput!
  ) {
    getAllChecksByPetId(
      limit: $limit
      offset: $offset
      field: $field
      order: $order
      where: $where
    ) {
      id
      arrive
      leave
      count
      responsibles {
        id
        type
        staff {
          id
          firstName
          lastName
        }
        user {
          id
          companyName
        }
      }
    }
  }
`
