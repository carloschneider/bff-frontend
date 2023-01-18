import { gql } from '@apollo/client'

export type AuthByKeyType = {
  token: string
  role: string
}

export type AuthByKeyDataType = {
  authByKey: AuthByKeyType
}

export type AuthByKeyInputType = {
  key: string
}

export type AuthByKeyVariablesInputType = {
  input: AuthByKeyInputType
}

export const MUTATION_AUTH_BY_KEY = gql`
  mutation AuthByKeyInput($input: AuthByKeyInput!) {
    authByKey(input: $input) {
      token
      role
    }
  }
`
