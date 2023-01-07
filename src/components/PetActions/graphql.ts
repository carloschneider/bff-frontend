import { gql } from '@apollo/client'

export type CheckType = {
  id: string
}

export type CheckInDataType = {
  checkIn: CheckType[]
}

export type CheckVariablesType = {
  petId: string
}

export const MUTATION_CHECKIN = gql`
  mutation CheckIn($petId: String!) {
    checkIn(petId: $petId) {
      id
    }
  }
`

export type CheckOutDataType = {
  checkIn: CheckType[]
}

export const MUTATION_CHECKOUT = gql`
  mutation CheckOut($petId: String!) {
    checkOut(petId: $petId) {
      id
    }
  }
`
