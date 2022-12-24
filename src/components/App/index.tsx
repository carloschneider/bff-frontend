import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'

import 'antd/dist/reset.css'

import Router from 'router'

const App = () => (
  <BrowserRouter>
    <ConfigProvider>
      <Router />
    </ConfigProvider>
  </BrowserRouter>
)

export default App
