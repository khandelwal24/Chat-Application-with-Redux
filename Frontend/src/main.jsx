import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './Redux/Store.jsx'
import {Provider} from 'react-redux'
import { ToastContainer,toast } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
    <ToastContainer position='top-center' autoClose={1000} theme='dark'/>
  </PersistGate>
  </Provider>
)
