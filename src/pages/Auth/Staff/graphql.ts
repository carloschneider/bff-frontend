import { gql } from '@apollo/client'

export type AuthStaffType = {
  id: string
}

export type AuthStaffDataType = {
  authStaff: AuthStaffType
}

export type AuthStaffVariablesType = {
  email: string
  company?: string
}

export type AuthStaffVariablesInputType = {
  input: AuthStaffVariablesType
}

export const MUTATION_AUTH_STAFF = gql`
  mutation AuthStaff($input: EmailAuthInput!) {
    authStaff(input: $input) {
      id
    }
  }
`
