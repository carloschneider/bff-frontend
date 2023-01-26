import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { App as AntdApp, ConfigProvider } from 'antd'
import { useCookies } from 'react-cookie'
import { RouterProvider } from 'react-router-dom'

import 'antd/dist/reset.css'
import './style.module.scss'

import { router } from 'router'

export const apolloLinkError = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )

        switch (message) {
          case 'jwt expired':
            ;(window as Window).location = '/'
            break

          default:
            break
        }
      })
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })

export const apolloAuthLink = (token: string) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }))

export const apolloHttpLink = () =>
  createHttpLink({
    uri: 'http://localhost:4000/graphql'
  })

const App = () => {
  const [cookies] = useCookies()
  const { token } = cookies

  const client = new ApolloClient({
    link: from([apolloLinkError(), apolloAuthLink(token), apolloHttpLink()]),
    cache: new InMemoryCache(),
    credentials: 'include'
  })

  return (
    <AntdApp>
      <ApolloProvider client={client}>
        <ConfigProvider>
          <RouterProvider router={router()} />
        </ConfigProvider>
      </ApolloProvider>
    </AntdApp>
  )
}

export default App
