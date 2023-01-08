import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
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

  const client = new ApolloClient({
    link: from([authLink, httpLink]),
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
