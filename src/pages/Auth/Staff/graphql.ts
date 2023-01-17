import { gql } from '@apollo/client'

export type AuthType = {
  id: string
}

export type AuthDataType = {
  authStaff: AuthType
}

export type AuthVariablesType = {
  email: string
  company: string
}

export type AuthVariablesInputType = {
  input: AuthVariablesType
}

export const MUTATION_AUTH = gql`
  mutation AuthStaff($input: EmailAuthInput!) {
    authStaff(input: $input) {
      id
    }
  }
`
