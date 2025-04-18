import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MainRouter } from './components/routers/MainRouter.jsx'

createRoot(document.getElementById('root')).render(
  <MainRouter>
    <App />
  </MainRouter>

  
)
