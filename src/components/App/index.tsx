import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { ConfigProvider } from 'antd'
import Cookies from 'js-cookie'
import { RouterProvider } from 'react-router-dom'

import 'antd/dist/reset.css'
import './style.module.scss'

import DynamicBreadcrumbProvider from 'context/DyanmicBreadcrumbContext'
import router from 'router'

const App = () => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
  })

  const authLink = setContext((_, { headers }) => {
    const token = Cookies.get('token')

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
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

  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    credentials: 'include'
  })

  return (
    <ApolloProvider client={client}>
      <ConfigProvider>
        <DynamicBreadcrumbProvider>
          <RouterProvider router={router} />
        </DynamicBreadcrumbProvider>
      </ConfigProvider>
    </ApolloProvider>
  )
}

export default App
