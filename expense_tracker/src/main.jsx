import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MainRouter } from './components/routers/MainRouter.jsx'
import { AuthContext } from './components/store/AuthContext.jsx'
import {Provider} from "react-redux"
import { store } from './components/store/ExpenseStore.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <AuthContext>
  <MainRouter>
    <App/>
   
  </MainRouter>
  </AuthContext>
  </Provider>
  
)
