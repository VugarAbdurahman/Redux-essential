import React from 'react'
import App from './App'
import { store } from './app/store'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { fetchUsers } from './features/users/userSlice'
import { worker } from './api/server'
import './index.css'

async function start() {
  await worker.start({ onUnhandledRequest: 'bypass' })

  const root = createRoot(document.getElementById('root'))
  store.dispatch(fetchUsers())
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
}

start()
