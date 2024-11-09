import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import FBContextProvider from '../context/FBContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FBContextProvider>
      <App />
    </FBContextProvider>
  </BrowserRouter>,
)
