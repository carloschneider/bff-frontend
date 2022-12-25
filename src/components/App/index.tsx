import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/reset.css'
import './style.module.css'

import Router from 'router'

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    credentials: 'include'
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ConfigProvider>
          <Router />
        </ConfigProvider>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
