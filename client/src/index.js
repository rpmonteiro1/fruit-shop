import './index.css'
import React          from 'react'
import ReactDOM       from 'react-dom'
import configureStore from './app/state/configure-store'
import App            from './app/views/app/App'

const state = window.__INITIAL_STATE__ || {}
const store = configureStore(state)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
