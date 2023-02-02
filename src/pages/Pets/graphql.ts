import { gql } from '@apollo/client'

import { OrderEnum } from 'helpers/pagination/order'
import { PetType } from 'pages/Pet/graphql'

export type PetsDataType = {
  getAllPets: Omit<PetType, 'tutors'>[]
}

export type PaginationType = {
  order?: OrderEnum
  field?: keyof PetType
  limit: number
  offset: number
}

type PetsWhereType = {
  name?: string
}

export type PetsVariablesType = {
  where?: PetsWhereType | null
} & PaginationType

export const QUERY_GET_ALL_PETS = gql`
  query GetAllPets(
    $limit: Int
    $offset: Int
    $field: String
    $order: String
    $where: PetWhereInput
  ) {
    getAllPets(
      limit: $limit
      offset: $offset
      field: $field
      order: $order
      where: $where
    ) {
      id
      name
      birthDate
      createdAt
      breed {
        name
      }
      count
    }
  }
`
