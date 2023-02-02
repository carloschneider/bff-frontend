import { gql } from '@apollo/client'

// Breed
export type BreedType = {
  name: string
}

// Tutor
export type TutorType = {
  id: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export type PetType = {
  id: string
  name: string
  birthDate: Date
  breed: BreedType
  count?: number | null
  tutors: TutorType[]
  createdAt?: Date
}

export type PetDataType = {
  getPetById: PetType
}

export type PetVariablesType = {
  petId?: string
}

export const GET_PET_BY_ID = gql`
  query GetPetById($petId: String!) {
    getPetById(petId: $petId) {
      id
      name
      birthDate
      breed {
        name
      }
      tutors {
        id
        firstName
        lastName
        phoneNumber
      }
    }
  }
`
