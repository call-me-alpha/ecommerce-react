import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './sass/index.scss'
import './assets/boxicons-2.1.2/css/boxicons.min.css'
import Layout from './components/Layout'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Layout />
    </Provider>
)
