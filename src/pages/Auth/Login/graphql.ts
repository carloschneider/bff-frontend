import { gql } from '@apollo/client'

export type AuthTutorType = {
  id: string
}

export type AuthTutorDataType = {
  authTutor: AuthTutorType
}

export type AuthTutorVariablesType = {
  email: string
  company?: string
}

export type AuthTutorVariablesInputType = {
  input: AuthTutorVariablesType
}

export const MUTATION_AUTH_TUTOR = gql`
  mutation AuthTutor($input: EmailAuthInput!) {
    authTutor(input: $input) {
      id
    }
  }
`
