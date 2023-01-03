import React from 'react'
import ReactDOM from 'react-dom/client'

import App from 'components/App'

const strictMode = true

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  strictMode ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  )
)
