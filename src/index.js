import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Routes from './routes/Routes'
import './sass/index.scss'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
